import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import { DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import {
  ConnectionsGame,
  BODIED_TEXTS,
  COLORS_BY_DIFFICULTY,
  correctFontSize,
  isMobile,
  normalizeCategories,
  shuffleArray,
  getTodayOffset,
  setPuzzleState,
  getPuzzleState,
  isSolved,
  CategoriesState,
  RecordedGuess,
  WordState,
  isDebug,
  getDateString,
  toInt,
} from './utils';
import VictoryModal from './VictoryModal';
import ConnectionsMenu from './ConnectionsMenu';
import ConnectionsBackButton from './ConnectionsBackButton';

const correctFontSizeForAnswers = (guess: string[]) => correctFontSize(guess.join(', '), isMobile() ? 200 : 300, 14);

const minChangesToEqualLists = (list1: string[], list2: string[]): number => {
  const freq1: { [key: string]: number } = {};

  // Count the frequency of strings in list1
  for (const string of list1) {
    freq1[string] = (freq1[string] || 0) + 1;
  }

  // Calculate the total changes needed
  let changesNeeded = 0;

  // Iterate through the strings in list2
  for (const string of list2) {
    if (freq1[string] && freq1[string] > 0) {
      freq1[string] -= 1; // Mark the string as used
    } else {
      changesNeeded += 1; // Count strings that need to be changed
    }
  }

  return changesNeeded;
};

const calcOffBy = (words: string[][], guess: string[]): number => {
  const offs = [];
  for (const word of words) {
    offs.push(minChangesToEqualLists(word, guess));
  }
  return Math.min(...offs);
};

function Box({
  word, selected, solved, onClick,
}: { word: string, selected: boolean, solved: boolean, onClick: () => void }) {
  const className = isMobile() ? 'word-box mobile' : 'word-box';
  return (
    <Button
      className={className}
      onClick={onClick}
      type={selected ? 'primary' : 'default'}
      disabled={solved}
      style={{
        fontSize: correctFontSize(word, isMobile() ? 45 : 75),
      }}
    >
      {word}
    </Button>
  );
}

function ConnectionsPlay({ game, backTo, debug }: { game: ConnectionsGame, backTo?: string, debug?: boolean }) {
  const normalizedCategories = normalizeCategories(game.categories);
  const allWords: { [key: string]: WordState } = {};
  const wordArr: string[] = [];
  const groupedWords: string[][] = [];
  for (const connection of normalizedCategories) {
    groupedWords.push(connection.words);
    for (const word of connection.words) {
      allWords[word] = { solved: false, difficulty: connection.id };
      wordArr.push(word);
    }
  }

  const categoryMap: CategoriesState = {};
  for (const category of normalizedCategories) {
    categoryMap[category.id] = category;
  }

  const location = useLocation();
  const [wordOrder, setWordOrder] = useState<string[]>(debug ? wordArr : shuffleArray(wordArr));
  const [wordState, setWordState] = useState<{ [key: string]: WordState }>(allWords);
  const [categoriesState, setCategoriesState] = useState(categoryMap);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<RecordedGuess[]>([]);
  const [copied, setCopied] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bodiedText, setBodiedText] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const id: string | null = window.location.pathname === '/connections/today'
    ? (getTodayOffset() + 1).toString()
    : (searchParams.get('id') || searchParams.get('categories') || searchParams.get('game') || null);
  const isNYTPuzzle = id && parseInt(id, 10) > 0;

  // Load puzzleState from localStorage
  useEffect(() => {
    if (!id) {
      return;
    }

    const puzzleState = getPuzzleState(id);
    if (puzzleState.categoriesState) {
      setCategoriesState(puzzleState.categoriesState);
      setWordState(wordStateForCategories(puzzleState.categoriesState));
    }
    if (puzzleState.guesses) {
      setGuesses(puzzleState.guesses);
    }
  }, [id]);

  // Save puzzleState to localStorage when categoriesState or guesses change
  useEffect(() => {
    if (id) {
      setPuzzleState(id, guesses, categoriesState);
    }
  }, [categoriesState, guesses]);

  // Check for victory
  useEffect(() => {
    const allSolved = isSolved(categoriesState);
    if (allSolved) {
      setVictory(true);
      setTimeout(() => {
        setShowModal(true);
      }, 500);
    }
  }, [categoriesState]);

  const wordStateForCategories = (categories: CategoriesState) => {
    const newWordState = { ...wordState };
    for (const category of Object.values(categories)) {
      for (const word of category.words) {
        newWordState[word].solved = category.solved || false;
      }
    }
    return newWordState;
  };

  const onSubmit = () => {
    if (selectedWords.length !== normalizedCategories.length) {
      return;
    }

    const firstWord = selectedWords[0];
    const index = wordState[firstWord].difficulty;
    const solved = selectedWords.every((word) => wordState[word].difficulty === index);
    const newGuesses = [...guesses, {
      words: selectedWords, correct: solved, off: calcOffBy(groupedWords, selectedWords),
    }];

    if (solved) {
      const newCategoryState = { ...categoriesState };
      newCategoryState[index].solved = true;
      setCategoriesState(newCategoryState);
      setWordState(wordStateForCategories(newCategoryState));
      setBodiedText('');
    } else {
      const last3 = newGuesses.slice(-3);
      const bodiedText = newGuesses.length >= 3 && last3.every((g) => !g.correct);
      if (bodiedText) {
        setBodiedText(BODIED_TEXTS[Math.floor(Math.random() * BODIED_TEXTS.length)]);
      }
    }

    setGuesses(newGuesses);
    setSelectedWords([]);
  };

  const serializeAndDownloadCSV = () => {
    const c = normalizedCategories.map(({ description, words }) => ([description, ...words]));
    const csv = Papa.unparse(c);
    const blob = new Blob([csv], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'connections.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const onClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
      return;
    }

    if (selectedWords.length === 4) {
      return;
    }

    setSelectedWords([...selectedWords, word]);
  };

  const shareButton = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'white',
    }}
    >
      <Button
        className="button with-margin"
        type="dashed"
        onClick={() => {
          if (navigator.share) {
            const shareData = {
              text: window.location.href,
            };
            navigator.share(shareData);
          } else {
            if (!copied) {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }
            navigator.clipboard.writeText(window.location.href);
          }
        }}
        icon={<ShareAltOutlined />}
      >
        {copied ? 'Copied to clipboard!' : 'Share puzzle'}
      </Button>

      {isDebug() && (
        <Button className="button" onClick={() => serializeAndDownloadCSV()} icon={<DownloadOutlined />}>
          Export as CSV
        </Button>
      )}
    </div>
  );

  const resetPuzzle = () => {
    setVictory(false);
    setGuesses([]);
    setCategoriesState(categoryMap);
    setWordState(allWords);
    setBodiedText('');
  };

  return (
    <>
      <ConnectionsMenu />
      <ConnectionsBackButton backTo={backTo} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: '24px 12px', maxWidth: '768px', width: '100%' }}>
          {guesses.length > 0 && <VictoryModal id={id} guesses={guesses} allWords={allWords} visible={victory && showModal} onClose={() => setShowModal(false)} />}

          {/* Title and author */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '82px',
          }}
          >
            <Title
              level={3}
              style={{
                display: 'flex', justifyContent: 'center', margin: 0, textAlign: 'center', maxWidth: '85%',
              }}
            >
              {isNYTPuzzle ? `New York Times #${id}` : game.title}
            </Title>
            <div
              style={{
                display: 'flex', justifyContent: 'center', marginTop: '4px', marginBottom: '16px', textAlign: 'center', maxWidth: '85%',
              }}
            >
              {isNYTPuzzle ? getDateString(toInt(id)! - 1) : game.author}
            </div>
          </div>

          {/* Correct guesses */}
          {
            guesses.map((guess) => {
              if (!guess.correct) {
                return null;
              }

              const category = categoryMap[allWords[guess.words[0]].difficulty];
              const { words } = category;
              return (
                <div
                  style={{
                    color: 'white',
                    backgroundColor: COLORS_BY_DIFFICULTY[category.id],
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: 'center',
                    height: '72px',
                    margin: '0 0 8px',
                  }}
                  key={guess.words.join(', ')}
                >
                  <strong>{category.description}</strong>
                  <div style={{ fontSize: correctFontSizeForAnswers(words) }}>{words.join(', ')}</div>
                </div>
              );
            })
          }

          {/* Remaining words to guess */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', margin: '0 -4px 24px -4px' }}>
            {
              wordOrder.map((word) => {
                if (wordState[word].solved) {
                  return null;
                }

                return (
                  <Box
                    key={word}
                    onClick={() => onClick(word)}
                    word={word}
                    selected={selectedWords.includes(word)}
                    solved={wordState[word].solved}
                  />
                );
              })
            }
          </div>

          {/* Game control buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {victory
              ? (
                <>
                  <Button className="button with-margin" type="primary" onClick={() => setShowModal(true)}>
                    View results
                  </Button>
                  <Button className="button with-margin" onClick={resetPuzzle}>
                    Reset puzzle
                  </Button>

                  {shareButton()}
                </>
              )
              : (
                <>
                  <Button className="button with-margin" type="primary" onClick={() => onSubmit()} disabled={selectedWords.length !== 4}>
                    Submit
                  </Button>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <Button className="button with-margin" onClick={() => setWordOrder(shuffleArray(wordOrder))}>
                      Shuffle
                    </Button>

                    <Button className="button with-margin" onClick={() => setSelectedWords([])}>
                      Deselect all
                    </Button>
                  </div>

                  {shareButton()}
                </>
              )}
          </div>

          <div style={{ borderBottom: '1px solid #d9d9d9', marginTop: '24px', marginBottom: '24px' }} />

          {/* Guesses */}
          {guesses.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <Title level={4} style={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>
                Guesses
              </Title>

              {
                guesses.map((guess) => (
                  <div
                    key={guess.words.join(', ')}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: guess.correct ? COLORS_BY_DIFFICULTY[allWords[guess.words[0]].difficulty] : 'darkgray',
                      border: '1px solid',
                      borderRadius: '8px',
                      height: '42px',
                      marginBottom: '8px',
                      color: 'white',
                    }}
                  >
                    <span style={{ margin: '0 24px', fontSize: correctFontSizeForAnswers(guess.words) }}>{guess.words.join(', ')}</span>
                    <span style={{
                      paddingRight: '24px', minWidth: '64px', display: 'flex', justifyContent: 'right',
                    }}
                    >
                      {' '}
                      {guess.off > 0 ? `${guess.off} off` : 'Correct!'}
                    </span>
                  </div>
                ))
              }

              {bodiedText && <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>{bodiedText}</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConnectionsPlay;
