// Band + show metadata, kept separate from the discography data.

export const BAND = {
  name: "A Thousand Feet Per Second",
  domain: "https://athousandfeetpersecond.com",
};

export interface ShowSlot {
  time: string;
  act: string;
}

export const SHOW = {
  venue: "Reggies Music Joint",
  address: "2105 S State St",
  city: "Chicago, IL",
  date: "Thursday, April 29, 2027",
  /** Doors / first set, America/Chicago. Drives the homepage countdown + show-night flip. */
  startsAt: "2027-04-29T20:00:00-05:00",
  dateShort: "Apr 29",
  lineup: [
    { time: "8:00", act: "A Thousand Feet Per Second" },
    { time: "", act: "The Stem Lords" },
  ] as ShowSlot[],
};
