import { Content, MysteryDetails, Response } from './mystery.model';

export const offlineMysteryCoverPhotoUrl = 'assets/offline-images/fake-cover.png';

export const offlineMysteryDetails: MysteryDetails = {
  title: 'The Case of the Missing Ruby Necklace',
  description:
    "Welcome, Nancy! You've arrived at the luxurious Sinclair Mansion in the English countryside to solve the mystery of the missing ruby necklace. Lady Eleanor Sinclair, the elegant owner of the mansion, has reported that her precious family heirloom, a stunning ruby necklace, has mysteriously disappeared from her private jewelry collection. The suspects include the charming butler, Mr. Jameson, the enigmatic art collector, Ms. Victoria Blackwood, and the ambitious family lawyer, Mr. Edward Sterling.",
  characters: [
    {
      name: 'Professor Evelyn Drake',
      imageUrl: '/assets/offline-images/fake-character.png',
      description:
        "A renowned archaeologist who was very interested in the emerald's historical significance. She has been working on a special exhibition at the museum."
    },
    {
      name: 'Mr. Victor Thornhill',
      imageUrl: '/assets/offline-images/fake-character.png',
      description:
        "The museum's curator, known for his meticulous attention to detail. He had recently expressed concerns about the museum's security."
    },
    {
      name: 'Ms. Penelope Hawthorne',
      imageUrl: '/assets/offline-images/fake-character.png',
      description:
        "A talented jewelry designer who had offered to create a custom display for the emerald. She seemed very invested in the gem's aesthetics."
    }
  ]
};

export const offlineResponse: Response = {
  details:
    "You're about to dive into the investigation of the missing ruby necklace at Sinclair Mansion. Let's start by interviewing the suspects and searching for clues.",
  suggestions: [
    {
      title: 'Interview the Suspects',
      description:
        'Begin your investigation by interviewing each of the suspects, Mr. Jameson, Ms. Victoria Blackwood, and Mr. Edward Sterling. Ask them about their whereabouts and any unusual occurrences on the day of the theft.'
    },
    {
      title: 'Search for Clues',
      description:
        'Explore the mansion to search for any potential clues related to the disappearance of the ruby necklace. Look for anything out of place or any hidden compartments that might contain evidence.'
    }
  ]
};

export const offlineShownMessages = [
  'Lets solve a mystery!',
  offlineMysteryDetails.description,
  offlineResponse.details,
  offlineResponse.details,
  offlineResponse.details,
  offlineResponse.details,
  offlineResponse.details,
  offlineResponse.details,
  offlineResponse.details,
  offlineResponse.details
];

export const offlineContent: Content = {
  mysteryDetails: offlineMysteryDetails,
  response: offlineResponse
};
