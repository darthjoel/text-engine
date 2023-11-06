// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const king1Disk = () => ({
    roomId: 'clearing', // Set this to the ID of the room you want the player to start in.
    rooms: [
      clearing,
      entrance,
      peddler,
      bird_room,
      snake,
      large_door,
      storeroom,
      chamber
    ],
    characters: [
      peddlerCharacter
    ]
  });

const clearing = 
{
  id: 'clearing',
  name: 'A Forest Clearing',
  desc: `You've been sent on a quest to find the Statue of Jefe. The quest begins in a forest clearing. To the SOUTH you see a set of ruined stone steps leading to a dark tunnel. `,
  exits: [
    {
      dir: 'south',
      id: 'entrance',
    },
  ],
};

const entrance = 
{
  id: 'entrance',
  name: 'Cave Entrance',
  desc: `The cave entrace opens wide. To the NORTH is the clearing. The cave continues to both the EAST and WEST. To the SOUTH is an old door covered in thick vines. Type ITEMS to see a list of items in the room.`,
  items: [
    {
      name: 'door',
      desc: 'It leads SOUTH.', // Displayed when the player looks at the item.
      onUse: () => println(`Type GO SOUTH to try the door.`), // Called when the player uses the item.
    },
    {
      name: ['vines', 'vine'], // The player can refer to this item by either name. The game will use the first name.
      desc: `They grew over the DOOR, blocking it from being opened.`,
    },
    {
      name: 'axe',
      desc: `You could probably USE it to cut the VINES, unblocking the door.`,
      isTakeable: true, // Allows the player to take the item.
      onUse() {
        // Remove the block on the room's only exit.
        const room = getRoom('entrance');
        const exit = getExit('south', room.exits);

        if (exit.block) {
          delete exit.block;
          println(`You cut through the vines, unblocking the door to the SOUTH.`);

          // Update the axe's description.
          getItem('axe').desc = `You USED it to cut the VINES, unblocking the door.`;
        } else {
          println(`There is nothing to use the axe on.`);
        }
      },
    }
  ],
  exits: [
    {
      dir: 'north',
      id: 'clearing',
    },
    {
      dir: 'east',
      id: 'peddler',
    },
    {
      dir: 'west',
      id: 'bird_room',
    },
    {
      dir: 'south',
      id: 'storeroom',
      block: `The DOOR leading SOUTH is overgrown with VINES.`, // If an exit has a block, the player will not be able to go that direction until the block is removed.
    },
  ],
};

const peddler = 
{
  id: 'peddler',
  name: 'An old peddler',
  desc: `An mysterious PEDDLER stands next to a folding table. You should look closer at him.`,
  exits: [
    {
      dir: 'west',
      id: 'entrance',
    },
  ],
};

const bird_room = 
{
  id: 'bird_room',
  name: 'A room with a white bird',
  desc: `The room opens up quite large with a high ceiling. More passage branch out to the WEST and NORTH. There is a white bird sitting on a silver perch chirping at you. Every time you approach the bird, it flies away from you. <img src="images/king1/white_bird.jpg">`,
  exits: [
    {
      dir: 'east',
      id: 'entrance',
    },
    {
      dir: 'west',
      id: 'large_door',
    },
    {
      dir: 'north',
      id: 'snake',
    },
  ],
};

const large_door = 
{
  id: 'large_door',
  name: 'A room with a large door',
  desc: `You enter a small, cramped, cool room. A large wooden door reinforced with iron straps sits to the WEST.<img src="images/king1/large_wooden_door.jpg">`,
  exits: [
    {
      dir: 'east',
      id: 'bird_room',
    },
    {
      dir: 'west',
      id: 'chamber',
      block: `The large DOOR leading WEST is locked.`, // If an exit has a block, the player will not be able to go that direction until the block is removed.
    },
  ],
};

const snake = 
{
  id: 'snake',
  name: 'A room with a large snake',
  desc: `There is a giant SNAKE curled up in the middle of the room! It looks interested in you. There is a passage to the SOUTH. <img src="images/king1/python.jpg">`,
  exits: [
    {
      dir: 'south',
      id: 'bird_room',
    },
  ],
};

const storeroom = 
{
  id: 'storeroom',
  name: 'The storeroom',
  desc: `A musty storeroom full on junk. There are ITEMS strewn all around.`,
  items: [
    {
      name: 'coins',
      desc: `A small bag of coins. <img src="images/king1/bag_of_coins.jpg">`,
      isTakeable: true, // Allows the player to take the item.
      onUse() {
        // use only in the peddler room
        const room = getRoom(disk.roomId);
        if (room.id == 'peddler') {
          println(`You give the coins to the old peddler. "I'd like to purchase the Statue of Jefe. His eyes light up with a glow. "Very good. Very good." he mutters and then pulls out something from a bag on the table. It is so beautiful is startles you. It is a small golden statue of a rabbit with ruby eyes.`);
          // remove the coins
          const itemIndex = disk.inventory.findIndex((item) => item.id === 'coins');
          disk.inventory.splice(itemIndex, 1);
          // add the bunny
          disk.inventory.push(bunny);
        } else {
          println(`There is nothing to use the coins on.`);
        }
      }
    }
  ],
  exits: [
    {
      dir: 'north',
      id: 'entrance',
    },
  ],
};

const chamber = 
{
  id: 'chamber',
  name: 'The Chamber',
  desc: `You enter the Chamber as a commanding hooded figure says to you, "I've been expecting you. Did you bring the Statue of Jefe?" You are so shocked that you barely speak. He looks so familiar but it can't be... You manage to say, "What is your name?" The hooded figure replies, "You can call me Agent Tanner. Your life is about to get much more interesting." TO BE CONTINUED... <img src="images/king1/hooded_dog.jpg">`,
};

const bunny = {
    name: 'bunny',
    desc: `A small golden statue of a bunny with ruby eyes. <img src="images/king1/rabbit_statue.jpg">`,
    isTakeable: true, // Allows the player to take the item.
    onUse() {
      // use only in the bird room
      const room = getRoom(disk.roomId);
      if (room.id == 'bird_room') {
        println(`You pull out the golden Statue of Jefe. The bird is immediately facinated by the ruby eyes. He flies over and sits on your shoulder.`);
        // add the bird
        disk.inventory.push(bird);
      } else {
        println(`There is nothing to use the Statue of Jefe on.`);
      }
    }
};

const bird = {
  name: 'bird',
  desc: `A small fluffy white bird <img src="images/king1/white_bird.jpg">`,
  isTakeable: true, // Allows the player to take the item.
  onUse() {
    // use only in the bird room
    const room = getRoom(disk.roomId);
    if (room.id == 'snake') {
      println(`The bird sees the snake and starts to attack it! It fearlessly swoops and dives pecking at the giant serpent's eyes. The snake retreats into a large hole in the wall. You find a brass key on the ground where the snake had been. You pick up the key.`);
      disk.inventory.push(key);
    } else {
      println(`There is nothing to use the bird on.`);
    }
  }
};

const key = {
  name: 'key',
  desc: `A brass key. <img src="images/king1/brass_key.jpg">`,
  isTakeable: true, // Allows the player to take the item.
  onUse() {
    // Remove the block on the room's only exit.
    const room = getRoom('large_door');
    const exit = getExit('west', room.exits);

    if (exit.block) {
      delete exit.block;
      println(`You use the key to unlock the door to the WEST.`);

      // Update the axe's description.
      getItem('key').desc = `You USED it to unlock the door.`;
    } else {
      println(`There is nothing to use the key on.`);
    }
  },
}

const peddlerCharacter =
{
  name: ['peddler', 'old man', 'old peddler'],
  roomId: 'peddler',
  desc: 'He looks mysterious and dirty like better times had passed him by. <img src="images/king1/mysterious_peddler.jpg">', // printed when the player looks at the character
  // optional callback, run when the player talks to this character
  onTalk: () => println(`"Good morning, or is it evening?" he says in a raspy voice, "Can I interest you in some goods for your adventure?"`),
  // things the player can discuss with the character
  topics: [
    {
      option: 'Do you know **WHERE** we are at? What this dungeon is?',
      line: `"Well, well, that it is a good question" he says rubbing his forehead. "I don't remember what this place is called. Or even how I got here."`,
      removeOnRead: true,
    },
    {
      option: `Do you have the Statue of **JEFE** for sale?`,
      line: `"Ah, that I do. But it will cost you. The Statue does not come cheap."`,
      prereqs: ['where'], // optional list of prerequisite topics that must be discussed before this option is available
    },
    {
      option: `Are there any **DANGERS** around here I should look out for?`,
      line: `His face turns white and his eyes widen. He speaks in a low whisper, "Watch 'er self or the snake will eat ya"`,
      prereqs: ['where'],
    },
  ],
};
