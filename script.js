// animations for moving up and down
function move_down() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('selection_page').style.opacity = '1';    
}

function go_home(){
  document.getElementById("selection_page").style.display = "block";
  document.getElementById("about").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("credits").style.display = "none";
}

function show_interests(){
  document.getElementById("selection_page").style.display = "none";
  document.getElementById("about").style.display = "block";
}

function show_game(){
  document.getElementById("selection_page").style.display = "none";
  document.getElementById("game").style.display = "block";
}

function show_credits(){
  document.getElementById("selection_page").style.display = "none";
  document.getElementById("credits").style.display = "block";
}

const songs = [
  {
    name: 'flum',
    src: 'flum.mp3'
  },
  {
    name: 'bleagh_2',
    src: 'bleagh_2.mp3'
  },
  {
    name: 'net_valued',
    src: 'net_valued.mp3'
  }
];

let currentAudio = null;

function play_music() {
  if (currentAudio && !currentAudio.paused) {
    // If there is a currently playing song, pause it
    currentAudio.pause();
    console.log('Song stopped:', currentAudio.dataset.name);
    return;
  }

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomSong = songs[randomIndex];

  const audio = new Audio(randomSong.src);
  audio.dataset.name = randomSong.name;
  audio.play();

  console.log('Now playing:', randomSong.name);

  // Store the currently playing audio
  currentAudio = audio;
}


//game code
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in your bed after hearing your alarm. It is 8 AM.',
    options: [
      {
        text: 'Get up',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Go back to sleep',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You get up and get dressed. You look around your room and remember you were supposed to go out to buy bagels. The store only has them in the morning',
    options: [
      {
        text: 'Get ready to go outside',
        nextText: 4
      },
      {
        text: 'Check out your closet',
        nextText: 5
      },
      {
        text: 'Look out your window',
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: 'You go back to sleep, leaving yourself in a deep slumber. You wake up again. It is 4 PM.',
    options: [
      {
        text: 'Try again another day',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'You grab a few of your things and prepare to head out the door. Surely, if you leave right now, those bagels will be yours!',
    options: [
      {
        text: 'Go back to bed',
        nextText: -1
      },
      {
        text: 'Leave to the great outside',
        nextText: 7
      }
    ]
  },
  {
    id: 5,
    text: 'There are a few things inside your closet.',
    options: [
      {
        text: 'Take backpack',
        setState: { backpack: true },
        nextText: 8
      },
      {
        text: 'Take jacket',
        setState: { jacket: true },
        nextText: 8
      },
      {
        text: 'Take the cube',
        setState: { cube: true },
        nextText: 8
      },
      {
        text: 'Not really feeling it',
        setState: { apathy: true },
        nextText: 8
      },
    ]
  },
  {
    id: 6,
    text: 'You stare out the window, looking intently for an excuse to not go outside. After sometime, you realize that you have been staring out the window for the past 2 hours.',
    options: [
      {
        text: 'Try again another day',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You finally get to go outside and begin your long journey towards the store. As you continue walking, you find a small and strange hole.',
    options: [
      {
        text: 'cube.',
        requiredState: (currentState) => currentState.cube,
        nextText: 9
      },
      {
        text: 'Check the backpack',
        requiredState: (currentState) => currentState.backpack,
        nextText: 10
      },
      {
        text: 'What do you want me to do about it',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'I am so glad you decided to take something, this will surely head in the adventure ahead!',
    options: [
      {
        text: 'Go outside',
        nextText: 7
      }
    ]
  },
  {
    id: 9,
    text: 'Turns out placing the cube in there was to bring about the end of time. Oh well.',
    options: [
      {
        text: 'Try again another day',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The backpack only has an apple and a radish inside it. None of those fit.',
    options: [
      {
        text: 'Continue to the bagels',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'After ignoring the hole, you finally made it to the store.',
    options: [
      {
        text: 'Go get the bagels',
        nextText: 12
      },
      {
        text: 'I should go home.',
        requiredState: (currentState) => currentState.apathy,
        nextText: 13
      }
    ]
  },
  {
    id: 12,
    text: 'You stand in front of the bagels. You take the ones needed and get ready to leave.',
    options: [
      {
        text: 'I should probably pay for this',
        nextText: 14
      },
      {
        text: 'Time to hide it in my jacket',
        requiredState: (currentState) => currentState.jacket,
        nextText: 15
      },
      {
        text: 'I wonder if I could trade this for the radish',
        requiredState: (currentState) => currentState.backpack,
        nextText: 16
      },
      {
        text: 'Why did I bring along the cube',
        requiredState: (currentState) => currentState.cube,
        nextText: 17
      }
    ]
  },
  {
    id: 13,
    text: 'You got all the way here, and you just want to throw all that work away? Okay, go ahead.',
    options: [
      {
        text: 'Try again another day',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'You pay for the bagels. You did the right thing.',
    options: [
      {
        text: 'Thanks for helping me buy bagels',
        nextText: -1
      }
    ]
  },
  {
    id: 15,
    text: 'Why would you steal it you had the money',
    options: [
      {
        text: 'I have no idea',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: 'Turns out they accept radishes as payment, you got to save some money!',
    options: [
      {
        text: 'This does not make any sense',
        nextText: -1
      }
    ]
  },
  {
    id: 17,
    text: 'The cube looks at you.',
    options: [
      {
        text: 'I should just buy the bagels',
        nextText: 14
      }
    ]
  },
]

startGame()