import { JeopardyGame } from './jeopardy-game.model';

export const firstGame: JeopardyGame = {
  categoryMap: {
    'Bears, Beets, Battlestar Galactica': [
      {
        question: 'What is a teapot?',
        answer:
          'Jim hid a note in this for Pam on Christmas, which he then took back before giving to her. We never got to know what it said.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is marijuana?',
        answer: "Dwight's brother grows this, which Dwight is disappointed in.",
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is trivia?',
        answer: "The Einsteins, Aeosop's Foibles, and The Backups were all teams names used when the office players played this.",
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Bandit?',
        answer: 'The cat named this, owned by Angela, falls through the cieling tile during an emergency at the office.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Bob Kazamakis?',
        answer:
          'Robert California uses this different name when he introduces himself to David Wallace after Wallace buys back Dunder Mifflin.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    "Oh the places we'll go": [
      {
        question: 'Where is New Orleans?',
        answer: 'Vegan Cheesesteaks, shaved ice cream, and macaroons are things we ate here.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is the Golden Gate Bridge?',
        answer: 'I always claim to have been on this without seeing this when visiting the west coast.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'where is Miami?',
        answer:
          'A wall of coffee containers describing country of origin, boldness, smoothness, etc. was found in a store while we were here.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Su Casa?',
        answer: 'The name of the restaurant in Cancun where we ate vegan chilaquiles while a Coati ran past us.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false
      },
      {
        question: 'What is The Laughing Seed?',
        answer: 'One of the best vegan food restaurants in town while visiting Asheville.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Ask your I.T. Ky': [
      {
        question: 'What is a div?',
        answer: 'One of the most common structual elements that make up HTML files.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Javascript Framework?',
        answer: 'Angular is an example of: Javascript Framework, Design System, or CSS Framework?',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'what is a class?',
        answer: 'Styles can be applied directly to an element using CSS, or you can apply many reusable styles at once using this.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What are branches?',
        answer: 'When you want to make changes without breaking the existing thing, you would use this "piece of a tree".',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What are major, minor, and patch?',
        answer: 'The three pieces that make up versions that look like X.Y.Z, for example 3.1.2',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Weird things people we know do': [
      {
        question: 'Who is G?',
        answer: 'Rapidly moves their hand in a circle motion and repeats a phrase when trying to get people to hurry',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Emma?',
        answer: 'Tends to send most of their communications in bursts, whether they be texts or voice messages.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Ky?',
        answer: 'Tends to unconsciously krack their knuckles when anxious or uncomfortable.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "Piping Hot"?',
        answer: 'Ed always desires his food to be this, and is his number one reason for not wanting to use food delivery services.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "the good couch spot"?',
        answer:
          'When done with a meal or just getting home, Nina will rush straight to this to prevent others from getting there before her.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    '"Bail" or "Ky"': [
      {
        question: 'What is a bailout?',
        answer: 'The term for when the government provides money to a large corporation to prevent them from going under.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'what is KyPhone?',
        answer: 'The name Ky always gives his phone.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false
      },
      {
        question: 'what is bail?',
        answer: 'The phrase youths say when they want to leave somewhere they do not want to be.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is a bail bond?',
        answer:
          'You purchase this from an agent to secure the release of someone from prison, while vowing the person will show up to court.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is stinky?',
        answer: 'One of the three charicteristics Bail thinks Ky would desire in another girl.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Its Locked!': [
      {
        question: 'Who is Tumi?',
        answer: 'The name of the dog hidden in a closet for half of The Sea of Darkness?',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "I can\'t check that off yet!"?',
        answer: 'Nancy tries to say this when you attempt to complete a task in her notebook that she has not done.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'what are France, Scotland, and Ireland?',
        answer: 'These three countries visited by Nancy in the games: Danger by Design, The Silent Spy, The Haunting of Castle Malloy',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: true
      },
      {
        question: 'What is Alibi in Ashes?',
        answer: 'This Nancy Drew game is the only game where you can play as Bess, George, Ned, and Nancy.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Mickey Malone?',
        answer: "In Ghost Dogs of Moon Lake, the game centers around this mobster's old home and hideout.",
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ]
  },
  players: [
    {
      name: 'Bail',
      score: 0
    }
  ]
};

export const generatedJeopardyGame: JeopardyGame = {
  categoryMap: {
    'Marvel Madness': [
      {
        question: 'Who is Iron Man?',
        answer: 'This billionaire genius created the first Iron Man suit in a cave with a box of scraps.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Vibranium?',
        answer: "This rare metal, found in Wakanda, makes up Captain America's shield.",
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Loki?',
        answer: "Known as the God of Mischief, this character is Thor's adopted brother.",
        pointValue: 300,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false
      },
      {
        question: 'What is the Quantum Realm?',
        answer: 'This dimension plays a key role in "Ant-Man and the Wasp" and time travel in "Avengers: Endgame".',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Peggy Carter?',
        answer: 'She co-founded S.H.I.E.L.D. and was the love interest of Steve Rogers.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Travel Trivia': [
      {
        question: 'Where is Paris?',
        answer: 'Known as the City of Lights and home to the Eiffel Tower.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is the Great Barrier Reef?',
        answer: "This world's largest coral reef system is located off the coast of Australia.",
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Where is Kyoto?',
        answer: 'Famous for its classical Buddhist temples, gardens, and imperial palaces in Japan.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Machu Picchu?',
        answer: 'An Incan citadel set high in the Andes Mountains in Peru.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Where is Reykjavik?',
        answer: 'The northernmost capital of a sovereign state, located in Iceland.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Tech Talk': [
      {
        question: 'What is an API?',
        answer: 'This acronym stands for a set of rules that allows one software application to interact with another.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is TypeScript?',
        answer: 'A superset of JavaScript that adds static typing, often used in Angular applications.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Firebase?',
        answer: "Google's platform that provides tools for building and managing apps, including real-time databases and hosting.",
        pointValue: 300,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false
      },
      {
        question: 'What is CI/CD?',
        answer: 'These combined practices ensure code changes are automatically tested and deployed.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is Jest?',
        answer: 'A popular JavaScript testing framework often paired with Spectator in Angular projects.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Pop Culture Picks': [
      {
        question: 'Who is Taylor Swift?',
        answer: 'This artist\'s "Eras Tour" became one of the highest-grossing tours of all time.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "Stranger Things"?',
        answer: 'A Netflix series where kids in Hawkins battle creatures from the Upside Down.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Pedro Pascal?',
        answer: 'This actor plays the Mandalorian and Joel in "The Last of Us" TV series.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "Succession"?',
        answer: 'An HBO series about the power struggle within the Roy family for control of a media empire.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "The Legend of Zelda"?',
        answer: 'A Nintendo franchise featuring the adventures of Link in the land of Hyrule.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Food for Thought': [
      {
        question: 'What is avocado toast?',
        answer: 'This trendy breakfast dish involves mashed green fruit served on bread.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is ramen?',
        answer: 'A Japanese noodle soup dish known for its flavorful broth and variety of toppings.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is gelato?',
        answer: 'An Italian dessert similar to ice cream but with a lower fat content and creamier texture.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is dim sum?',
        answer: 'This Chinese cuisine includes a variety of small dishes like dumplings and buns.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: true
      },
      {
        question: 'What is paella?',
        answer: 'A Spanish rice dish often cooked with seafood, chicken, and vegetables.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ],
    'Gaming Greats': [
      {
        question: 'What is "Animal Crossing"?',
        answer: 'A relaxing life simulation game where players build and decorate an island community.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Lara Croft?',
        answer: 'The protagonist of the "Tomb Raider" franchise, known for her archaeological adventures.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "The Witcher 3"?',
        answer: 'This RPG follows Geralt of Rivia as he searches for his adopted daughter, Ciri.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'Who is Master Chief?',
        answer: 'The main protagonist of the "Halo" series, known for fighting the Covenant.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      },
      {
        question: 'What is "Final Fantasy VII"?',
        answer: 'This installment in a famous JRPG series features Cloud Strife and the villain Sephiroth.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false
      }
    ]
  },
  players: [
    {
      name: 'Bail',
      score: 0
    }
  ]
};
