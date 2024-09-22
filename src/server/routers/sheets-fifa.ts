import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { procedure, router } from '../trpc';
import { players } from '@/commons/fifa-data';
import { z } from 'zod';

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
    const rows = await sheet.getRows({ limit: 7 });
    const toObjectRows = rows.map((row) => row.toObject());
    sheet.headerValues.shift();

    const formattedData = sheet.headerValues.reduce(
      (accPlayer, currPlayer) =>
        Object.assign(
          accPlayer,
          (() => {
            const formattedRow = toObjectRows.reduce(
              (accRow, currRow) =>
                Object.assign(
                  accRow,
                  (() => {
                    return { [currRow['AÇÕES']]: currRow[currPlayer] };
                  })()
                ),
              { NAME: currPlayer }
            );
            return {
              [currPlayer]: formattedRow,
            };
          })()
        ),
      {}
    ) as Record<(typeof players)[number], Record<string, string>>;

    return formattedData;
  }),
  updateSheetData: procedure
  .input(
    z.object
    ({ 
      value: z.string(),
      column: z.number(),
      row: z.number() 
    }))
    .query(async ({ input }) => {
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
      

      await sheet.loadCells('A1:I7');
      const a1 = sheet.getCell(input.row, input.column);
      a1.value = input.value;
      await sheet.saveUpdatedCells();
      return a1.value;
    }),
});


