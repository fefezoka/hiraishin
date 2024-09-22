import { escalacao, spinner } from '@/assets';
import { actions, players } from '@/commons/fifa-data';
import { Loading } from '@/components/loading';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUpdateCell } from '@/hooks/fifa';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { MdCheck } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';

export default function Fifa() {
  const { data: players, isLoading } = trpc.fifaRouter.getSheetData.useQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!players) {
    return;
  }

  return (
    <div className="max-w-[774px] font-medium m-auto px-3 py-6">
      <div className="relative inline-block">
        <Image className="hidden sm:block" src={escalacao} alt="" />
        <PlayerPopover player={players['DAVID']}>
          <div className="sm:absolute cursor-pointer sm:h-16 flex items-end top-[19.5%] left-[39.5%]">
            {players['DAVID']['NAME']}
          </div>
        </PlayerPopover>
        <PlayerPopover player={players['IANGUAS']}>
          <div className="sm:absolute cursor-pointer sm:h-16 flex items-end top-[19.5%] right-[35.5%]">
            {players['IANGUAS']['NAME']}
          </div>
        </PlayerPopover>
        <PlayerPopover player={players['VERONA']}>
          <div className="sm:absolute cursor-pointer sm:h-16 flex items-end top-[35%] left-[35.5%]">
            {players['VERONA']['NAME']}
          </div>
        </PlayerPopover>

        <PlayerPopover player={players['FELIPE']}>
          <div className="sm:absolute cursor-pointer sm:h-16 flex items-end top-[35%] right-[34.5%]">
            {players['FELIPE']['NAME']}
          </div>
        </PlayerPopover>

        <PlayerPopover player={players['VITOR']}>
          <div className="sm:absolute cursor-pointer sm:h-16 flex items-end top-[48%] right-[46%]">
            {players['VITOR']['NAME']}
          </div>
        </PlayerPopover>

        <PlayerPopover player={players['NETO']}>
          <div className="sm:absolute cursor-pointer sm:h-16 flex items-end top-[50%] left-[16.5%]">
            {players['NETO']['NAME']}
          </div>
        </PlayerPopover>
      </div>
    </div>
  );
}

const PlayerPopover = ({
  player,
  children,
}: {
  player: Record<string, number | string>;
  children: ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="text-center text-lg font-bold pb-1 mb-3 border-b-input border-b-2">
          {player['NAME']}
        </div>
        <div className="space-y-2 text-sm">
          {Object.entries(player)
            .slice(1)
            .map(([key, value]) => (
              <div
                className="grid grid-cols-2 gap-x-3 items-center justify-between"
                key={key}
              >
                <div className=" text-right shrink-0">{key}</div>
                <CellInput
                  action={key}
                  player={player['NAME'] as string}
                  value={value as number}
                />
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface CellInputProps {
  player: string;
  action: string;
  value: number;
}

const CellInput = ({ action, player, value }: CellInputProps) => {
  const updateCell = useUpdateCell();

  const debounced = useDebouncedCallback(
    (
      player: (typeof players)[number],
      action: (typeof actions)[number],
      value: number
    ) => {
      const playerIndex = players.findIndex((name) => name === player);
      const actionIndex = actions.findIndex((name) => name === action);

      updateCell.mutateAsync({
        column: playerIndex + 1,
        row: actionIndex + 1,
        value,
      });
    },
    1000
  );

  return (
    <div className="flex gap-4 items-center">
      <Input
        onBlur={() => {
          if (updateCell.isSuccess) {
            updateCell.reset();
          }
        }}
        className="max-w-[144px]"
        onChange={(e) => {
          const value = +e.target.value;

          if (isNaN(value)) return;

          debounced(player as (typeof players)[number], action, value);
        }}
        type="number"
        defaultValue={value}
      />
      {updateCell.isLoading && <Image src={spinner} alt="" height={24} width={24} />}
      {updateCell.isSuccess && <MdCheck className="h-[22px] w-[22px] text-green-500" />}
    </div>
  );
};
