import { actions, players } from '@/commons/fifa-data';
import { trpc } from '@/utils/trpc';
import { produce } from 'immer';

export const useUpdateCell = () => {
  const utils = trpc.useContext();

  return trpc.fifaRouter.updateSheetData.useMutation({
    onMutate: ({ column, row, value }) => {
      utils.fifaRouter.getSheetData.setData(
        undefined,
        (old) =>
          old &&
          produce(old, (draft) => {
            const playerName = players[column - 1];
            const action = actions[row - 1];

            draft[playerName][action] = value;
          })
      );
    },
  });
};
