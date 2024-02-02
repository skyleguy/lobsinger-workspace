import { Character, Chat } from './character';
import { Game } from './game';
import { InteractionStatus } from './interactable';
import { Location, Scene } from './location';
import { AddChatToCharacter } from './trigger';

const characters: Character[] = [
  new Character({
    name: 'Lady Vanderbilt',
    id: '1',
    description: 'The matriarch of the Vanderbilt family',
    image: '',
    status: InteractionStatus.INTERACTABLE,
    salutations: ['Sup.', 'How can I help', 'Check out these isometric mountains'],
    valedictions: ['See you.', 'Catch you later.', 'Bye Felicia.'],
    chats: [
      new Chat({
        userOption: 'Where were you last night?',
        characterResponse: 'I was sitting in my living room with my cats. Whats it to you?',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '1',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'I was just wondering sheesh',
              characterResponse: 'Well mind your own business next time', // already seeing an issue with how chats work. chat contains trigger which contains add chat to character trigger which contains chat which contains add chat to character trigger, etc.
              isPerpetual: true
            })
          })
        ]
      }),
      new Chat({
        userOption: 'What do you do for work?',
        characterResponse: 'I sit here and solve every one elses problems all day long using my pretty keyboard.',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '2',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'How do you think others would describe your job?',
              characterResponse: 'They would probably say that i am overpaid and under worked!',
              isPerpetual: true
            })
          })
        ]
      })
    ]
  }),
  new Character({
    name: 'Maxwell Vanderbily',
    id: '2',
    description: 'The son of Lady Vanderbilt. A rich and pretentious snoot who spends all day studying',
    image: '',
    status: InteractionStatus.INTERACTABLE,
    salutations: ['Sup.', 'How can I help', 'Check out these isometric mountains'],
    valedictions: ['See you.', 'Catch you later.', 'Bye Felicia.'],
    chats: [
      new Chat({
        userOption: 'Where were you last night?',
        characterResponse: 'I was sitting in my living room with my cats. Whats it to you?',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '1',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'I was just wondering sheesh',
              characterResponse: 'Well mind your own business next time', // already seeing an issue with how chats work. chat contains trigger which contains add chat to character trigger which contains chat which contains add chat to character trigger, etc.
              isPerpetual: true
            })
          })
        ]
      }),
      new Chat({
        userOption: 'What do you do for work?',
        characterResponse: 'I sit here and solve every one elses problems all day long using my pretty keyboard.',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '2',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'How do you think others would describe your job?',
              characterResponse: 'They would probably say that i am overpaid and under worked!',
              isPerpetual: true
            })
          })
        ]
      })
    ]
  }),
  new Character({
    name: 'Chef Stout',
    id: '3',
    description: 'The scottish chef of the vanderbilt castle. Is always worried about getting orders out on time.',
    image: '',
    status: InteractionStatus.INTERACTABLE,
    salutations: ['Sup.', 'How can I help', 'Check out these isometric mountains'],
    valedictions: ['See you.', 'Catch you later.', 'Bye Felicia.'],
    chats: [
      new Chat({
        userOption: 'Where were you last night?',
        characterResponse: 'I was sitting in my living room with my cats. Whats it to you?',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '1',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'I was just wondering sheesh',
              characterResponse: 'Well mind your own business next time', // already seeing an issue with how chats work. chat contains trigger which contains add chat to character trigger which contains chat which contains add chat to character trigger, etc.
              isPerpetual: true
            })
          })
        ]
      }),
      new Chat({
        userOption: 'What do you do for work?',
        characterResponse: 'I sit here and solve every one elses problems all day long using my pretty keyboard.',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '2',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'How do you think others would describe your job?',
              characterResponse: 'They would probably say that i am overpaid and under worked!',
              isPerpetual: true
            })
          })
        ]
      })
    ]
  }),
  new Character({
    name: 'Macy Smith',
    id: '4',
    description: 'The Vanderbilts young yet accomplished accountant. Keeps track of all finances for the vanderbilts',
    image: '',
    status: InteractionStatus.INTERACTABLE,
    salutations: ['Sup.', 'How can I help', 'Check out these isometric mountains'],
    valedictions: ['See you.', 'Catch you later.', 'Bye Felicia.'],
    chats: [
      new Chat({
        userOption: 'Where were you last night?',
        characterResponse: 'I was sitting in my living room with my cats. Whats it to you?',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '1',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'I was just wondering sheesh',
              characterResponse: 'Well mind your own business next time', // already seeing an issue with how chats work. chat contains trigger which contains add chat to character trigger which contains chat which contains add chat to character trigger, etc.
              isPerpetual: true
            })
          })
        ]
      }),
      new Chat({
        userOption: 'What do you do for work?',
        characterResponse: 'I sit here and solve every one elses problems all day long using my pretty keyboard.',
        triggers: [
          new AddChatToCharacter({
            characterId: '1',
            id: '2',
            isComplete: false,
            taskDescription: 'Talk to Kyle and see if they have anything to say',
            chat: new Chat({
              userOption: 'How do you think others would describe your job?',
              characterResponse: 'They would probably say that i am overpaid and under worked!',
              isPerpetual: true
            })
          })
        ]
      })
    ]
  })
];

export const mockGame: Game = new Game({
  characters,
  locations: [
    new Location({
      id: '1',
      name: 'The Castle',
      description: 'A rich and fancy pre-1900 stone castle nestled in the mountains during winter',
      isDefault: true,
      image: 'https://i.imgur.com/XiS0NWC.png',
      status: InteractionStatus.INTERACTABLE,
      scenes: [
        new Scene({
          id: '1',
          name: 'The Den',
          description:
            'The den of the castle complete with a fireplace, large floor to ceiling window. It has rich wood and stone finishings',
          image: 'https://i.imgur.com/cIrJd09.png',
          isDefault: true,
          status: InteractionStatus.INTERACTABLE,
          sceneOverlays: [
            {
              element: characters[0],
              boxCoordinates: { x: 35, y: 50 }
            }
          ]
        }),
        new Scene({
          id: '2',
          name: 'The Study',
          description: 'A large and luxurious miniature library. Maxwell can often be found here studying.',
          image: 'https://i.imgur.com/v1plkhs.png',
          isDefault: false,
          status: InteractionStatus.INTERACTABLE,
          sceneOverlays: [
            {
              element: characters[1],
              boxCoordinates: { x: 75, y: 350 }
            }
          ]
        }),
        new Scene({
          id: '3',
          name: 'The Kitchen',
          description: 'A kitchen built for kings! Chef Stout is the leader of this domain and is always under pressure.',
          image: 'https://i.imgur.com/LGx3j0b.png',
          isDefault: false,
          status: InteractionStatus.INTERACTABLE,
          sceneOverlays: [
            {
              element: characters[3],
              boxCoordinates: { x: 75, y: 350 }
            }
          ]
        }),
        new Scene({
          id: '4',
          name: 'The Office',
          description:
            'An office space designed to act as the castle head quarters. Macy is always here monitoring the Vanderbilt finances',
          image: 'https://i.imgur.com/X3ciTrF.png',
          isDefault: false,
          status: InteractionStatus.INTERACTABLE,
          sceneOverlays: [
            {
              element: characters[3],
              boxCoordinates: { x: 75, y: 350 }
            }
          ]
        })
      ]
    })
  ]
});
