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
