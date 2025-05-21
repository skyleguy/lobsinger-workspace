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
      name: 'The Fam',
      score: 0
    }
  ]
};

export const beachGame1: JeopardyGame = {
  categoryMap: {
    'Quotes from The Office': [
      {
        answer: "'That's what she said.'",
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Michael Scott?'
      },
      {
        answer: "'Whenever I'm about to do something, I think, would an idiot do that? And if they would, I do not do that thing.'",
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Dwight Schrute?'
      },
      {
        answer: "'Bears. Beets. Battlestar Galactica.'",
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Jim Halpert?'
      },
      {
        answer: "'I feel God in this Chili’s tonight.'",
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Pam Beesly?'
      },
      {
        answer: "'Rit-dit-dit-doo!'",
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Andy Bernard?'
      }
    ],
    'Animal Kingdom': [
      {
        answer: 'This is the fastest land animal in the world.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a cheetah?'
      },
      {
        answer: 'The largest animal to have ever lived.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a blue whale?'
      },
      {
        answer: 'This sea creature has three hearts and blue blood.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is an octopus?'
      },
      {
        answer: 'This bird cannot fly but is an excellent swimmer.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a penguin?'
      },
      {
        answer: 'This animal has the longest known pregnancy, lasting nearly two years.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is an elephant?'
      }
    ],
    'Food Facts': [
      {
        answer: 'This green fruit is often spread on toast and is known for its healthy fats.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is an avocado?'
      },
      {
        answer: 'The most expensive spice in the world by weight.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false,
        question: 'What is saffron?'
      },
      {
        answer: 'Kimchi, yogurt, and sourdough bread all rely on this process.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is fermentation?'
      },
      {
        answer: 'This cheese is most commonly used on margherita pizza.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is mozzarella?'
      },
      {
        answer: 'This buttery French pastry is shaped like a crescent.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a croissant?'
      }
    ],
    Wanderlust: [
      {
        answer: 'This iconic structure is located in Paris, France.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is the Eiffel Tower?'
      },
      {
        answer: 'Mount Fuji is located in this country.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Japan?'
      },
      {
        answer: 'This kind of trip involves observing wild animals in their natural African habitat.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a safari?'
      },
      {
        answer: 'This natural wonder is located off the coast of Queensland, Australia.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is the Great Barrier Reef?'
      },
      {
        answer: 'This style of budget travel involves carrying your belongings from place to place, usually on foot.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is backpacking?'
      }
    ],
    'Movie Magic': [
      {
        answer: "This 1997 blockbuster included the line, 'I'm the king of the world!'",
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Titanic?'
      },
      {
        answer: 'This film was Pixar’s first full-length animated feature.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Toy Story?'
      },
      {
        answer: "This mafia classic includes the quote, 'I'm gonna make him an offer he can't refuse.'",
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is The Godfather?'
      },
      {
        answer: "This film includes the line, 'Life is like a box of chocolates.'",
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Forrest Gump?'
      },
      {
        answer: 'A film by Christopher Nolan known for exploring dreams within dreams.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Inception?'
      }
    ],
    'Tech Tidbits': [
      {
        answer: 'This short-range wireless tech is used to connect headphones and speakers.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Bluetooth?'
      },
      {
        answer: 'This markup language is used to build the basic structure of web pages.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is HTML?'
      },
      {
        answer: 'This field of computer science simulates human intelligence in machines.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is artificial intelligence?'
      },
      {
        answer: 'This form of storage lets you access files from anywhere via the internet.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false,
        question: 'What is cloud storage?'
      },
      {
        answer: 'This black-and-white square image can be scanned to link to websites or information.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a QR code?'
      }
    ]
  },
  players: [
    {
      name: 'Bail',
      score: 0
    },
    {
      name: 'Daniel',
      score: 0
    },
    {
      name: 'Gigi',
      score: 0
    },
    {
      name: 'Nina',
      score: 0
    }
  ]
};

export const bailsBeachGame: JeopardyGame = {
  categoryMap: {
    'Nancy Drew PC Games': [
      {
        answer: 'In this game, Nancy investigates an Icelandic town and meets a dog named Tumi.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Sea of Darkness?'
      },
      {
        answer: 'This game takes place on a spooky island known for its creepy amusement park.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is The Haunted Carousel?'
      },
      {
        answer: 'Nancy visits a Scottish castle and uncovers secrets tied to bagpipes and legends.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is The Captive Curse?'
      },
      {
        answer: 'In this snowy mystery, Nancy investigates a ski resort in Canada.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is White Wolf of Icicle Creek?'
      },
      {
        answer: 'Nancy decodes hieroglyphics and explores a tomb in this Egypt-based adventure.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Tomb of the Lost Queen?'
      }
    ],
    'Figma UX Design': [
      {
        answer: 'This type of file lets multiple designers collaborate in real-time.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a Figma design file?'
      },
      {
        answer: 'You can use these to create reusable buttons, cards, and more in Figma.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are components?'
      },
      {
        answer: 'This feature allows switching between different versions of the same component.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are variants?'
      },
      {
        answer: 'This prototyping feature links screens together with animated transitions.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are interactions?'
      },
      {
        answer: 'These let you preview how a design might respond at different screen sizes.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are auto layout and constraints?'
      }
    ],
    'Ariana Grande Songs': [
      {
        answer: "This hit from the 'Sweetener' album repeats the phrase 'I just want you to come with me.'",
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: "What is 'No Tears Left to Cry'?"
      },
      {
        answer: 'This thank-you anthem lists her exes by name.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false,
        question: "What is 'Thank U, Next'?"
      },
      {
        answer: "In this song, she says, 'Wearing a ring but ain't gon' be no Mrs.'",
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: "What is '7 Rings'?"
      },
      {
        answer: "This sultry track shares a title with a weekday and was part of the 'Dangerous Woman' era.",
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: "What is 'Side to Side'?"
      },
      {
        answer: "This Ariana Grande song features the lyric, 'Boy, you got me walkin’ side to side,' and includes Nicki Minaj.",
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: "What is 'Side to Side'?"
      }
    ],
    'Vegan Food': [
      {
        answer: 'This protein-packed legume is often used to make hummus.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are chickpeas?'
      },
      {
        answer: 'This dairy-free milk is made from ground almonds and water.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is almond milk?'
      },
      {
        answer: 'This fruit is used in many vegan baking recipes as an egg substitute.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a banana?'
      },
      {
        answer: 'A fermented soybean product often used as a meat alternative.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is tempeh?'
      },
      {
        answer: 'This type of seaweed is often used to make vegan sushi.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is nori?'
      }
    ],
    'Wicked the Movie': [
      {
        answer: 'This actress plays Elphaba in the 2024 film adaptation.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Cynthia Erivo?'
      },
      {
        answer: 'This character is famously known as the Wicked Witch of the West.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Elphaba?'
      },
      {
        answer: "This song features the line, 'It’s time to try defying gravity.'",
        pointValue: 300,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false,
        question: "What is 'Defying Gravity'?"
      },
      {
        answer: 'This actor plays Fiyero in the upcoming film adaptation.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Jonathan Bailey?'
      },
      {
        answer: 'This bubbly blonde character is Elphaba’s schoolmate and future Glinda the Good.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Galinda?'
      }
    ],
    'Music Theory': [
      {
        answer: 'This term refers to the speed or pace of a piece of music.',
        pointValue: 100,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is tempo?'
      },
      {
        answer: 'This is the symbol that raises a pitch by a half step.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a sharp?'
      },
      {
        answer: 'This is the distance between two notes.',
        pointValue: 300,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is an interval?'
      },
      {
        answer: 'This term describes playing softly in musical notation.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is piano?'
      },
      {
        answer: 'This key signature has no sharps or flats.',
        pointValue: 500,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is C major?'
      }
    ]
  },
  players: [
    {
      name: 'Daniel',
      score: 0
    },
    {
      name: 'Ky',
      score: 0
    },
    {
      name: 'Nina',
      score: 0
    }
  ]
};

export const nisBeachGame: JeopardyGame = {
  categoryMap: {
    'Dunder Mifflin Deep-Cuts': [
      {
        answer: 'Michael Scott’s favorite innuendo-laden punchline, delivered dozens of times over nine seasons.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is "That’s what she said"?'
      },
      {
        answer: 'Power-hungry Dwight often touts this self-appointed management title that puts him just beneath the boss.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Assistant to the Regional Manager?'
      },
      {
        answer: 'At the 2006 Mid-Market Office-Supply Convention, Michael secures this paper supplier once exclusive to Staples.',
        pointValue: 600,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Hammermill?'
      },
      {
        answer: 'In Season 5’s “Casual Friday,” Kevin catastrophically spills a vat of this homemade specialty on the carpet.',
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is chili?'
      },
      {
        answer: 'Michael Scott’s action-hero alter-ego who saves the NHL All-Star Game in his passion-project film.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Michael Scarn?'
      }
    ],

    'Frontend & Full-Stack': [
      {
        answer: 'HTML, CSS and JavaScript are often nicknamed this trio of web fundamentals.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is the front-end trifecta?'
      },
      {
        answer: 'Invoking this React hook queues a re-render whenever its setter is called.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is useState?'
      },
      {
        answer: 'HTTP/2 eliminates head-of-line blocking by using this technique that lets many requests share one TCP connection.',
        pointValue: 600,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is stream multiplexing?'
      },
      {
        answer: 'This build-step optimisation removes selectors that never appear in your markup; PurgeCSS popularised it.',
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is CSS tree-shaking (or CSS purging)?'
      },
      {
        answer: 'The term JAMstack expands to these three words.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are JavaScript, APIs and Markup?'
      }
    ],

    'ML & Data Science': [
      {
        answer: 'In pandas, this one-word method drops rows containing missing values.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is dropna?'
      },
      {
        answer: 'BLEU, introduced in 2002, was designed to evaluate this natural-language task.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is machine translation?'
      },
      {
        answer: 'A variational autoencoder nudges its latent variables toward this bell-shaped probability distribution.',
        pointValue: 600,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is the standard normal (Gaussian) distribution?'
      },
      {
        answer: 'Decision trees often choose splits by minimising this information-theory impurity measure, –Σ pᵢ log₂ pᵢ.',
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is entropy?'
      },
      {
        answer: 'FlashAttention speeds up transformers by replacing full quadratic attention with this block-sparse variant.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is tiled (block-sparse) attention?'
      }
    ],

    'UX Marks the Spot': [
      {
        answer: 'Steve Krug’s usability classic insists good design should never force users to do this mental action.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is think?'
      },
      {
        answer: 'Fitts’ Law says movement time rises with distance and falls as this target attribute grows.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is target size?'
      },
      {
        answer: "The web-design 'three-click rule' tries to limit this discrete action before any content is reachable.",
        pointValue: 600,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What are clicks?'
      },
      {
        answer: 'In Peter Morville’s UX honeycomb, the facet concerned with emotional appeal is this nine-letter word.',
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is desirable?'
      },
      {
        answer: 'Unlike SUS’s 5-point Likert, the AttrakDiff questionnaire scores desirability on this 0-to-100 measuring device.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is a semantic differential (slider) scale?'
      }
    ],

    'Plant-Powered Plates': [
      {
        answer: 'Purée of chickpeas, tahini, lemon and garlic yields this Middle-Eastern staple dip.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is hummus?'
      },
      {
        answer: 'Traditional tofu is curdled using nigari, a brine rich in this magnesium compound.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is magnesium chloride?'
      },
      {
        answer: 'Chickpea canning liquid that whips like egg whites goes by this nautical-sounding name.',
        pointValue: 600,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is aquafaba?'
      },
      {
        answer: 'Fermented soybean slabs from Indonesia—often marinated then pan-fried—are called this.',
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is tempeh?'
      },
      {
        answer: 'Tiny, iron-rich grain central to Ethiopian injera is this.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is teff?'
      }
    ],

    'Pop Divas: Ari • Bey • Tay': [
      {
        answer: 'Before *Sam & Cat*, Ariana Grande first played Cat Valentine on this Nickelodeon sitcom.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is *Victorious*?'
      },
      {
        answer: 'Beyoncé unveiled her fierce alter-ego persona with the 2008 double album titled this.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Sasha Fierce?'
      },
      {
        answer: 'The only rapper to appear on Taylor Swift’s rerecorded albums, joining her 2023 version of “Bad Blood.”',
        pointValue: 600,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'Who is Kendrick Lamar?'
      },
      {
        answer: 'On *Sweetener*, this deep-cut opens its bridge with the lyric “Out here in the open, I…”.',
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is “Everytime”?'
      },
      {
        answer:
          'During the 1989 World Tour, Taylor performed “Clean” acoustically only once—name the European capital city that got it on 21 June 2015.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Amsterdam?'
      }
    ],

    'Silicon Valley Titans': [
      {
        answer: 'This Cupertino company’s late co-founder introduced the iPhone on 9 January 2007.',
        pointValue: 200,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Apple?'
      },
      {
        answer: 'X.com’s 2000 merger with Confinity produced this online payments giant.',
        pointValue: 400,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is PayPal?'
      },
      {
        answer: "Daily Double!  Google’s 2015 corporate shake-up created this umbrella holding company for its 'moonshots.'",
        pointValue: 600,
        isValid: true,
        isDailyDouble: true,
        isTriplePlay: false,
        question: 'What is Alphabet?'
      },
      {
        answer: "The 2017 paper 'Attention Is All You Need' unveiled this now-ubiquitous neural network architecture.",
        pointValue: 800,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is the Transformer?'
      },
      {
        answer: 'Founded by ex-OpenAI siblings in 2019, this Claude-creating startup was valued above $15 billion in 2024.',
        pointValue: 1000,
        isValid: true,
        isDailyDouble: false,
        isTriplePlay: false,
        question: 'What is Anthropic?'
      }
    ]
  },
  players: [
    {
      name: 'Bail',
      score: 0
    },
    {
      name: 'Ky',
      score: 0
    },
    {
      name: 'Daniel',
      score: 0
    },
    {
      name: 'Gigi',
      score: 0
    }
  ]
};
