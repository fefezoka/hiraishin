import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { characters, properties } from '@/commons/hiraishindle-data';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useOutsideClick } from '@/hooks/mouse-handler';

function getRandomValueByDay<T>(array: T[]): T {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seed = today.getTime();

  const seededRandom = (seed: number): number => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const randomIndex = Math.floor(seededRandom(seed) * array.length);

  return array[randomIndex];
}

const CHOSEN = getRandomValueByDay(characters);

export default function Hiraishindle() {
  const [text, setText] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isFishined, setIsFinished] = useState<boolean>();
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>();
  const ref = useOutsideClick(() => setIsSelectOpen(false));

  const chosenCharacter = characters.find((character) => character.name === CHOSEN.name)!;
  const formattedCharacters = characters.filter((character) => {
    if (guesses.find((guess) => guess === character.name)) {
      return false;
    }

    return text ? character.name.toLowerCase().startsWith(text.toLowerCase()) : true;
  });

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const input = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;

    if (!input.value) {
      return;
    }

    handleSubmitName(formattedCharacters[0].name);
  };

  const handleSubmitName = async (name: string): Promise<void> => {
    if (guesses.find((guess) => name === guess) || isFishined) {
      return;
    }

    setText('');
    setIsSelectOpen(false);
    setGuesses((old) => [name, ...old]);

    if (name === CHOSEN.name) {
      setIsFinished(true);
    }
  };

  const onInputChange = (value: string) => {
    if (text === '' && value.length === 1) {
      setIsSelectOpen(true);
    }

    if (value.length === 0 && text.length === 1) {
      setIsSelectOpen(false);
    }

    setText(value);
  };

  const checkAnswer = (value: PersonProperty, chosenValue: PersonProperty): string => {
    if (Array.isArray(value)) {
      if (
        value.every((itr) => (chosenValue as []).some((chosenItr) => chosenItr === itr))
      ) {
        if (
          value.length === (chosenValue as []).length &&
          value.every((itr, i) => itr === (chosenValue as [])[i])
        ) {
          return 'correct';
        }
        return 'semicorrect';
      }
    }
    if (value === chosenValue) {
      return 'correct';
    }

    return 'wrong';
  };

  const formatProperty = (
    value: PersonProperty,
    chosenValue: PersonProperty
  ): string | number | React.JSX.Element => {
    if (Array.isArray(value)) {
      return <span className="text-xs">{value.join(', ')}</span>;
    }

    if (typeof value === 'number' && typeof chosenValue === 'number') {
      return (
        <div className="flex gap-1 items-center">
          {value.toFixed(2)}
          {value !== chosenValue &&
            (value > chosenValue ? (
              <ArrowDown strokeWidth={3.5} className="w-4 h-4" />
            ) : (
              <ArrowUp strokeWidth={3.5} className="w-4 h-4" />
            ))}
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return value ? 'Sim' : 'Não';
    }

    return value;
  };

  return (
    <main className="max-w-[660px] font-medium m-auto px-3 pb-6">
      <form
        onSubmit={handleSubmitForm}
        className="flex gap-2 relative max-w-[400px] w-full m-auto items-center justify-center"
      >
        <Input
          onClick={(e) => e.currentTarget.value && setIsSelectOpen(true)}
          disabled={isFishined}
          value={text}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button type="submit">
          <MdSend className="w-5 h-5" />
        </button>
        {formattedCharacters.length !== 0 && (
          <div
            ref={ref}
            className={cn(
              'w-full border top-12 left-0  h-[400px] ',
              isSelectOpen ? 'absolute' : 'hidden'
            )}
          >
            <ScrollArea className="h-[inherit] bg-gray-800">
              <div className="h-0.5 w-full bg-ring" />
              <div className="divide-y divide-gray-700">
                {formattedCharacters.map((character) => (
                  <div
                    onSelect={() => console.log(character)}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-700 transition-all duration-75"
                    key={character.name}
                    onClick={() => handleSubmitName(character.name)}
                  >
                    {character.name}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </form>
      {guesses.length !== 0 && (
        <div className="mt-6 text-sm">
          <div className="grid gap-2 grid-cols-6 text-center">
            {properties.map((property) => (
              <div
                className="flex items-center justify-center border-b-4 p-2"
                key={property}
              >
                <span>{property}</span>
              </div>
            ))}
            {guesses.map((guess) =>
              Object.values(
                characters.find((character) => character.name === guess)!
              ).map((value, index) => {
                const chosenCharacterValues = Object.values(chosenCharacter);

                return (
                  <div
                    className={cn(
                      'h-[75px] px-0.5 flex items-center justify-center font-semibold py-4 rounded-lg border-4-black data-[answer=wrong]:bg-red-700 data-[answer=correct]:bg-green-700 data-[answer=semicorrect]:bg-yellow-700',
                      index === 0 && 'bg-gray-200 text-black'
                    )}
                    data-answer={
                      index !== 0 && checkAnswer(value, chosenCharacterValues[index])
                    }
                    key={value.toString()}
                  >
                    {formatProperty(value, chosenCharacterValues[index])}
                  </div>
                );
              })
            )}
          </div>
          {isFishined && (
            <span id="gg" className="mt-6 block text-center text-4xl">
              GG!
            </span>
          )}
        </div>
      )}
    </main>
  );
}
