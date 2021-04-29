import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(public commonService: CommonService) { }

  ExportToExcel(order): void {
    
    const header = ['S.No', 'ProductId','Brand','Model','Description', 'Tax Percentage', 'Quantity', 'Qunatity Type','MRP','Disc Percentage','Discounted Rate','Total'];
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(order.name);

    //Add TitleRow
    const title = 'Order ID: ' + order.orderId + ' Order Name: ' + order.name;
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.mergeCells('A1:L1');
    worksheet.addRow([]);

    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7cfc00' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    let dataRangeStart = 4;
    let dataRangeEnd = 4+order.items.length;
    
    var datarow;
    var taxCellRange = {};
    order.items.forEach((item,index) => {
      //datarow = worksheet.addRow([index+1,item.productId,item.brand,item.model,item.desc,item.tax,item.qty,item.qtyType,item.mrp,parseInt(item.disc),item.mrp - ((item.disc/100)*item.mrp),(item.mrp - ((item.disc/100)*item.mrp))*item.qty]);
      datarow = worksheet.addRow([index+1,item.productId,item.brand,item.model,item.desc,item.tax,item.qty,item.qtyType,item.mrp,parseInt(item.disc),0,0]);
      if(taxCellRange[item.tax] == undefined){
        taxCellRange[item.tax] = '';
      }
      taxCellRange[item.tax] += "L"+(index+dataRangeStart)+",";
    });

    datarow.eachCell((cell, index)=>{
      if(index == 5){
        worksheet.getColumn(index).width = 30;
        worksheet.getColumn(index).alignment = { wrapText: true };
      }
      if(index == 2 || index == 3 || index == 4){
        worksheet.getColumn(index).width = 15;
        worksheet.getColumn(index).alignment = { wrapText: true };
      }
      if(index == 11 || index == 12){
        worksheet.getColumn(index).width = 15;
      }
    })

    //DiscountedRateFormula
    var DiscountedRateCellRange = 'K'+dataRangeStart+':K'+(dataRangeEnd-1);
    var  DiscountedRateFormula= 'I'+dataRangeStart+'-((J'+dataRangeStart+'/100)*I'+dataRangeStart+')';
    worksheet.fillFormula(DiscountedRateCellRange, DiscountedRateFormula);
    
    //ItemTotalFormula
    var totalCellRange = 'L'+dataRangeStart+':L'+(dataRangeEnd-1);
    var ItemTotalFormula = 'K'+dataRangeStart+'*G'+dataRangeStart;
    worksheet.fillFormula(totalCellRange, ItemTotalFormula);

    var cellRange;
    //Add TotalRow
    let row = worksheet.addRow(["Total Amount"]);
    cellRange = 'L'+dataRangeEnd+':L'+dataRangeEnd;
    row.alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.mergeCells('A'+dataRangeEnd+':K'+dataRangeEnd);
    //worksheet.getCell('L'+dataRangeEnd).value = order.cartTotal;
    worksheet.fillFormula(cellRange, 'SUM('+totalCellRange+')');
    let TotalCell = 'L'+(dataRangeEnd);
    let totalTaxRange = 'SUM(L'+(dataRangeEnd+1)+':L';
    
    if(order.status != 'In Cart' && order.status != 'Submitted'){
      //Add SGST and CGST
      let row;
      for (const key in order.taxPercentages) {
        dataRangeEnd++;
        cellRange = 'K'+dataRangeEnd+':K'+dataRangeEnd;
        row = worksheet.addRow(["SGST @ "+ parseInt(key)/2+"% - Output Tax on ₹" ,parseFloat(order.taxPercentages[key].toFixed(2))]);
        row.alignment = { vertical: 'middle', horizontal: 'right' };
        worksheet.mergeCells('A'+dataRangeEnd+':J'+dataRangeEnd);
        worksheet.fillFormula(cellRange,'SUM('+taxCellRange[key].slice(0, -1)+')');
        cellRange = 'L'+dataRangeEnd+':L'+dataRangeEnd;
        //worksheet.getCell('L'+dataRangeEnd).value = parseFloat((((parseInt(key)/2)/100) * order.taxPercentages[key]).toFixed(2));
        worksheet.fillFormula(cellRange,'ROUND((('+parseInt(key)+'/2)/100)*K' + dataRangeEnd + ',2)');
      }
      for (const key in order.taxPercentages) {
        dataRangeEnd++;
        cellRange = 'K'+dataRangeEnd+':K'+dataRangeEnd;
        row = worksheet.addRow(["CGST @ "+ parseInt(key)/2+"% - Output Tax on ₹" , parseFloat(order.taxPercentages[key].toFixed(2))]);
        row.alignment = { vertical: 'middle', horizontal: 'right' };
        worksheet.mergeCells('A'+dataRangeEnd+':J'+dataRangeEnd);
        worksheet.fillFormula(cellRange,'SUM('+taxCellRange[key].slice(0, -1)+')');
        cellRange = 'L'+dataRangeEnd+':L'+dataRangeEnd;
        //worksheet.getCell('L'+dataRangeEnd).value = parseFloat((((parseInt(key)/2)/100) * order.taxPercentages[key]).toFixed(2));
        worksheet.fillFormula(cellRange,'ROUND((('+parseInt(key)+'/2)/100)*K' + dataRangeEnd + ',2)');
      }

      totalTaxRange += dataRangeEnd+')';

      //Add AmountWithTax
      dataRangeEnd++;
      cellRange = 'L'+dataRangeEnd+':L'+dataRangeEnd;
      row = worksheet.addRow(["Amount With Tax"]);
      row.alignment = { vertical: 'middle', horizontal: 'right' };
      worksheet.mergeCells('A'+dataRangeEnd+':K'+dataRangeEnd);
      //var taxTotal = 0;
      // for(var taxPercentage in order.taxPercentages){
      //   taxTotal += (order.taxPercentages[taxPercentage] * (parseInt(taxPercentage)/100));
      // }
      //worksheet.getCell('L'+dataRangeEnd).value = parseFloat((order.cartTotal + taxTotal).toFixed(2));
      worksheet.fillFormula(cellRange, 'ROUND(' + TotalCell+'+'+totalTaxRange + ',2)');

      //Add CashDiscount
      dataRangeEnd++;
      row = worksheet.addRow(["Cash Discount"]);
      row.alignment = { vertical: 'middle', horizontal: 'right' };
      worksheet.mergeCells('A'+dataRangeEnd+':K'+dataRangeEnd);
      worksheet.getCell('L'+dataRangeEnd).value = order.cashDiscount;

      //Final Amount Rounded Off
      dataRangeEnd++;
      cellRange= 'L'+dataRangeEnd+':L'+dataRangeEnd;
      row = worksheet.addRow(["Final Amount Rounded Off To"]);
      row.alignment = { vertical: 'middle', horizontal: 'right' };
      worksheet.mergeCells('A'+dataRangeEnd+':K'+dataRangeEnd);
      //worksheet.getCell('L'+dataRangeEnd).value = Math.round(order.cartTotal + taxTotal - order.cashDiscount);
      worksheet.fillFormula(cellRange, 'ROUND(L' +(dataRangeEnd-2)+ '-L'+ (dataRangeEnd-1) +',0)');
    }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, order.orderId + '.xlsx');
    });
  }

  
}
