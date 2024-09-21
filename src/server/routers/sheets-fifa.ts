import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { procedure, router } from '../trpc';

export const fifaRouter = router({
  getSheetData: procedure.query(async () => {
    const serviceAccountAuth = new JWT({
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      email: process.env.GOOGLE_EMAIL,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const doc = new GoogleSpreadsheet(
      '1INObmp-0-mfdZCNTwyptcchLe6l7FKO572vr1BTM4Yg',
      serviceAccountAuth
    );

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    console.log(sheet.title);
    console.log(sheet.rowCount);

    await sheet.loadCells('A1:I7');
    const a1 = sheet.getCell(3, 1).value;
    return a1;
  }),
});
