const projects = {
  color: {
    title: "Color Flasher",
    brief: "Click a button. Detonate the screen in color.",
    time: "30-45 minutes",
    concepts: ["variable", "click event", "screen update"],
    unlocks: ["screen updates", "visual feedback"],
    snakeUse: "Snake board redraws after every move.",
    initialCode: `# Store the current color
color = "teal"

# Show it on the screen
show(color)`,
    hint: `Change "teal" to "purple", then run the chunk again.`,
    conceptName: "screen update",
    conceptText: "A screen update changes what the learner sees after data changes."
  },
  dice: {
    title: "Dice Roller",
    brief: "Roll visual dice. Watch randomness become output.",
    time: "30-60 minutes",
    concepts: ["variable", "random number", "click event"],
    unlocks: ["random apple", "screen output"],
    snakeUse: "Snake uses randomness when an apple appears.",
    initialCode: `// Roll one die
let roll = randomNumber(1, 6);

// Store the message
let message = "You rolled " + roll;

// Show the result
screen.text = message;`,
    hint: "The important moving part is roll. It should become a number from 1 to 6.",
    conceptName: "variable",
    conceptText: "A variable stores a value so the program can use it later."
  },
  reaction: {
    title: "Reaction Timer",
    brief: "Wait for the flash. Click fast. Measure the signal.",
    time: "30-60 minutes",
    concepts: ["state", "timing", "click event"],
    unlocks: ["input", "state changes"],
    snakeUse: "Snake listens for input and changes direction.",
    initialCode: `// Track the game state
let waiting = true;
let startTime = now();

// When the screen flashes
screen.color = "green";

// Click to measure reaction time
let reaction = now() - startTime;`,
    hint: "State tells the app whether it is waiting, flashing, or finished.",
    conceptName: "state",
    conceptText: "State is the current condition of the program. It helps clicks mean different things at different times."
  },
  clicker: {
    title: "Click Counter",
    brief: "Click once. Watch state become score.",
    time: "30-45 minutes",
    concepts: ["state", "increment", "event", "score"],
    unlocks: ["score", "feedback loop"],
    snakeUse: "Snake updates score when the apple is eaten.",
    initialCode: `# Show the starting score
score = 0
show(score)`,
    hint: "The score is stored first, then shown on screen.",
    conceptName: "score",
    conceptText: "A score is state that changes when an event happens."
  },
  rps: {
    title: "Rock Paper Scissors",
    brief: "Choose a move. Let conditions decide the result.",
    time: "45-60 minutes",
    concepts: ["choice", "random choice", "condition", "result"],
    unlocks: ["decisions", "game logic"],
    snakeUse: "Snake uses conditions for collision, apple pickup, game over, and restart.",
    initialCode: `# Store the player move
player = "rock"
show(player)`,
    hint: "Start by storing one player choice, then show it.",
    conceptName: "condition",
    conceptText: "A condition lets the program choose what happens next."
  }
};

const supportedColors = {
  teal: "#00C8A0",
  purple: "#8B5CF6",
  orange: "#FF6B35",
  green: "#3DD68C"
};

const lessonData = {
  color: [
    {
      id: "color-see-signal",
      title: "See the Signal",
      stepLabel: "Step 1 / 7",
      goal: "Watch the loop before naming it.",
      instruction: "Click Run. You are looking for one thing: the screen changes.",
      hint: `The screen changes when show(...) receives a supported color.
Try:
show("teal")`,
      code: `# Watch the signal
show("teal")`,
      prediction: {
        prompt: "What do you think will change?",
        type: "choice",
        options: ["The text", "The color", "The score", "Not sure"],
        expected: "The color"
      },
      runSuccess: "Signal locked.\nThe screen changed color.",
      conceptName: "input → output",
      conceptLock: "Code can create a visible response. You run code, and the screen changes.",
      snakeConnection: "Snake also redraws the screen after something changes.",
      validationMode: "color-show",
      optional: false
    },
    {
      id: "color-store-color",
      title: "Store a Color",
      stepLabel: "Step 2 / 7",
      goal: "Store the current color.",
      instruction: "A variable remembers one value. Change the color name, then run it.",
      hint: `A variable stores one value.
Try:
color = "purple"`,
      code: `# Store the current color
color = "teal"`,
      prediction: {
        prompt: "What color is stored?",
        type: "text",
        expected: "teal"
      },
      runSuccess: "Output confirmed.\ncolor now stores \"teal\".",
      conceptName: "variable",
      conceptLock: "A variable stores a value so the program can use it later.",
      snakeConnection: "Snake stores the current position before drawing it.",
      validationMode: "color-assignment",
      optional: false
    },
    {
      id: "color-show-color",
      title: "Show the Color",
      stepLabel: "Step 3 / 7",
      goal: "Display the stored color.",
      instruction: "The screen can show what the program remembers. Run it and watch the output panel.",
      hint: `You already stored the color. Now send it to the screen:
show(color)`,
      code: `# Store the current color
color = "teal"

# Show it on the screen
show(color)`,
      prediction: {
        prompt: "What should show(color) display?",
        type: "choice",
        options: ["Only the word teal", "Only a teal panel", "Both", "Not sure"],
        expected: "Both"
      },
      runSuccess: "Output confirmed.\nshow(color) displayed the stored value.",
      conceptName: "screen update",
      conceptLock: "The variable stores the value. show(color) sends that value to the screen.",
      snakeConnection: "Snake stores positions, then draws them on the board.",
      validationMode: "color-show-variable",
      optional: false
    },
    {
      id: "color-change-state",
      title: "Change the Color",
      stepLabel: "Step 4 / 7",
      goal: "Change the stored value.",
      instruction: "When a variable changes, the output can change too. The last value wins.",
      hint: `Change the color assignment before the second show().
Try changing "teal" to "orange".`,
      code: `# First color
color = "teal"
show(color)

# New color
color = "orange"
show(color)`,
      prediction: {
        prompt: "What color will be shown last?",
        type: "text",
        expected: "orange"
      },
      runSuccess: "Output confirmed.\nThe final stored color is \"orange\".",
      conceptName: "state change",
      conceptLock: "State means what the program remembers right now. The last value stored in color is the current state.",
      snakeConnection: "Snake changes state every time it moves.",
      validationMode: "color-final-assignment",
      optional: false
    },
    {
      id: "color-function",
      title: "Name the Action",
      stepLabel: "Step 5 / 7",
      goal: "Put the color change inside a function.",
      instruction: "A function is a named action. This one changes the screen color.",
      hint: `The def line names the action. The call line runs it.
Make sure flash_color() appears after the def block.`,
      code: `# Name the action
def flash_color():
    color = "teal"
    show(color)

# Run the action
flash_color()`,
      prediction: {
        prompt: "Which line starts the color change?",
        type: "choice",
        options: ["def flash_color():", "color = \"teal\"", "show(color)", "flash_color()"],
        expected: "flash_color()"
      },
      runSuccess: "Working.\nflash_color() ran the function.",
      conceptName: "function",
      conceptLock: "A function is a named action. flash_color() means run the color-changing action.",
      snakeConnection: "Snake will use named actions like move_snake(), draw_apple(), and check_collision().",
      validationMode: "function-call",
      optional: false
    },
    {
      id: "color-button-event",
      title: "Connect It to a Button",
      stepLabel: "Step 6 / 7",
      goal: "Make a click trigger the function.",
      instruction: "A click is an event. An event can trigger code.",
      hint: `button.on_click takes the function name, not a call.
Try: button.on_click(flash_color)`,
      code: `# Define the action
def flash_color():
    color = "teal"
    show(color)

# Connect the click
button.on_click(flash_color)`,
      prediction: {
        prompt: "What should happen when the button is clicked?",
        type: "text",
        expected: "flash_color runs"
      },
      runSuccess: "Button connected.\nClick triggered flash_color().",
      conceptName: "event",
      conceptLock: "An event is something that happens. In this project, the click event runs flash_color.",
      snakeConnection: "Snake uses keyboard events to change direction.",
      validationMode: "button-event",
      optional: false
    },
    {
      id: "color-random-choice",
      title: "Bonus: Random Color",
      stepLabel: "Bonus",
      goal: "Let the program choose a color.",
      instruction: "A list stores multiple options. random_choice picks one.",
      hint: `random_choice needs a list with brackets.
colors = ["teal", "purple", "orange", "green"]`,
      code: `# Store color options
colors = ["teal", "purple", "orange", "green"]

# Pick one color
color = random_choice(colors)

# Show it
show(color)`,
      prediction: {
        prompt: "Will the same color appear every time?",
        type: "choice",
        options: ["Yes", "No", "Only if teal is first", "Not sure"],
        expected: "No"
      },
      runSuccess: "Output confirmed.\nrandom_choice picked a color.",
      conceptName: "random choice",
      conceptLock: "A list stores multiple values. random_choice picks one.",
      snakeConnection: "Snake uses randomness when the apple appears somewhere new.",
      validationMode: "random-color",
      optional: true
    }
  ],
  dice: [
    {
      id: "dice-see-roll",
      title: "See the Roll",
      stepLabel: "Step 1 / 7",
      goal: "Watch randomness become output.",
      instruction: "Click Run. You are looking for a number from 1 to 6.",
      hint: `random_number(1, 6) gives the die a value between 1 and 6.`,
      code: `# Roll one die
roll = random_number(1, 6)
show(roll)`,
      prediction: {
        prompt: "What kind of value should appear?",
        type: "choice",
        options: ["A color", "A number from 1 to 6", "A word", "Not sure"],
        expected: "A number from 1 to 6"
      },
      runSuccess: "Chunk compiled.\nroll is a number from 1 to 6.",
      conceptName: "random number",
      conceptLock: "A random number lets the program choose within a range.",
      snakeConnection: "Snake uses random numbers to place apples.",
      validationMode: "dice-random-number",
      optional: false
    },
    {
      id: "dice-store-roll",
      title: "Store the Roll",
      stepLabel: "Step 2 / 7",
      goal: "Save the random number.",
      instruction: "A variable can store a result. Here, roll stores the die value.",
      hint: `The variable name is roll. That is where the die result gets stored.`,
      code: `# Roll one die
roll = random_number(1, 6)

# Store and show it
show(roll)`,
      prediction: {
        prompt: "What variable stores the result?",
        type: "text",
        expected: "roll"
      },
      runSuccess: "Output confirmed.\nroll stored the die result.",
      conceptName: "variable",
      conceptLock: "A variable stores a value so the program can use it later.",
      snakeConnection: "Snake stores the apple position before drawing it.",
      validationMode: "dice-roll-variable",
      optional: false
    },
    {
      id: "dice-message",
      title: "Build a Message",
      stepLabel: "Step 3 / 7",
      goal: "Turn the number into readable output.",
      instruction: "Programs often combine text and values. This makes output easier to read.",
      hint: `Build the message first, then show it:
message = "You rolled " + roll
show(message)`,
      code: `# Roll one die
roll = random_number(1, 6)

# Build a message
message = "You rolled " + roll
show(message)`,
      prediction: {
        prompt: "What should the message look like?",
        type: "text",
        expected: "You rolled"
      },
      runSuccess: "Output confirmed.\nThe number became a message.",
      conceptName: "string output",
      conceptLock: "A message combines text with stored data so the result is easier to understand.",
      snakeConnection: "Snake uses messages for score, game over, and restart prompts.",
      validationMode: "dice-message",
      optional: false
    },
    {
      id: "dice-visual-face",
      title: "Show a Dice Face",
      stepLabel: "Step 4 / 7",
      goal: "Use data to control a visual.",
      instruction: "The number controls which dice face appears. Data can drive visuals.",
      hint: `show_dice takes the roll number and draws the matching face.
Try: show_dice(roll)`,
      code: `# Roll one die
roll = random_number(1, 6)

# Show the matching dice face
show_dice(roll)`,
      prediction: {
        prompt: "If roll is 6, what should appear?",
        type: "choice",
        options: ["One pip", "Six pips", "A color flash", "Not sure"],
        expected: "Six pips"
      },
      runSuccess: "Output confirmed.\nroll controlled the dice face.",
      conceptName: "data-driven visual",
      conceptLock: "Data can control what appears on screen.",
      snakeConnection: "Snake uses data to decide where each body segment appears.",
      validationMode: "dice-visual",
      optional: false
    },
    {
      id: "dice-function",
      title: "Name the Roll",
      stepLabel: "Step 5 / 7",
      goal: "Put the roll into a reusable function.",
      instruction: "A function is a named action. roll_die() means roll and show the result.",
      hint: `def roll_die(): names the action. roll_die() runs it.
Make sure roll_die() appears after the def block.`,
      code: `# Name the action
def roll_die():
    roll = random_number(1, 6)
    show_dice(roll)

# Run the action
roll_die()`,
      prediction: {
        prompt: "Which line starts the roll?",
        type: "choice",
        options: ["def roll_die():", "roll = random_number(1, 6)", "show_dice(roll)", "roll_die()"],
        expected: "roll_die()"
      },
      runSuccess: "Working.\nroll_die() ran the function.",
      conceptName: "function",
      conceptLock: "A function packages a set of steps under one name.",
      snakeConnection: "Snake will use functions like spawn_apple() and draw_snake().",
      validationMode: "dice-function",
      optional: false
    },
    {
      id: "dice-button-event",
      title: "Connect the Roll Button",
      stepLabel: "Step 6 / 7",
      goal: "Make a click roll the die.",
      instruction: "A button click can trigger the roll_die function.",
      hint: `button.on_click takes the function name without ().
Try: button.on_click(roll_die)`,
      code: `# Define the action
def roll_die():
    roll = random_number(1, 6)
    show_dice(roll)

# Connect the click
button.on_click(roll_die)`,
      prediction: {
        prompt: "What should happen when the button is clicked?",
        type: "text",
        expected: "roll_die runs"
      },
      runSuccess: "Button connected.\nClick triggered roll_die().",
      conceptName: "event",
      conceptLock: "An event can run a function later.",
      snakeConnection: "Snake uses keyboard events to trigger direction changes.",
      validationMode: "dice-button-event",
      optional: false
    },
    {
      id: "dice-repeat",
      title: "Roll Again",
      stepLabel: "Step 7 / 7",
      goal: "Confirm the value changes across runs.",
      instruction: "Run it several times. The structure stays the same, but the value can change.",
      hint: `The structure stays the same each run. Click Run several times and watch the value change.`,
      code: `# Define the action
def roll_die():
    roll = random_number(1, 6)
    show_dice(roll)

button.on_click(roll_die)`,
      prediction: {
        prompt: "Will every roll be the same?",
        type: "choice",
        options: ["Yes", "No", "Only if the button changes", "Not sure"],
        expected: "No"
      },
      runSuccess: "Output confirmed.\nThe same code can produce a new result.",
      conceptName: "repeatable action",
      conceptLock: "A function can run again and produce a new result.",
      snakeConnection: "Snake repeats its game loop over and over.",
      validationMode: "dice-repeat",
      optional: false
    }
  ],
  reaction: [
    {
      id: "reaction-see-flash",
      title: "See the Flash",
      stepLabel: "Step 1 / 7",
      goal: "Watch the screen wait, then flash.",
      instruction: "Click Run. Wait for the screen to change. Do not click early.",
      hint: `Start with wait(), then flash("green"). The order matters.`,
      code: `# Wait, then flash
wait()
flash("green")`,
      prediction: {
        prompt: "What should happen after waiting?",
        type: "choice",
        options: ["The screen flashes", "The dice rolls", "The score resets", "Not sure"],
        expected: "The screen flashes"
      },
      runSuccess: "Signal armed.\nThe screen flashed.",
      conceptName: "timed output",
      conceptLock: "Code can wait before changing the screen.",
      snakeConnection: "Snake updates on a timer during the game loop.",
      validationMode: "reaction-flash",
      optional: false
    },
    {
      id: "reaction-start-time",
      title: "Store the Start Time",
      stepLabel: "Step 2 / 7",
      goal: "Remember when the flash starts.",
      instruction: "A timer needs a starting point. start_time stores when the flash appears.",
      hint: `now() captures the current moment. Store it in start_time.`,
      code: `# Store the start time
start_time = now()
show("green")`,
      prediction: {
        prompt: "What does start_time remember?",
        type: "choice",
        options: ["The color", "The current time", "The score", "Not sure"],
        expected: "The current time"
      },
      runSuccess: "Output confirmed.\nstart_time stored the current time.",
      conceptName: "time value",
      conceptLock: "A time value marks when something happened.",
      snakeConnection: "Snake uses timing to move at regular intervals.",
      validationMode: "reaction-start-time",
      optional: false
    },
    {
      id: "reaction-measure",
      title: "Measure Reaction",
      stepLabel: "Step 3 / 7",
      goal: "Compare now to the start time.",
      instruction: "Reaction time is the difference between two moments.",
      hint: `Reaction time is the difference between now and when the timer started.
reaction_time = now() - start_time`,
      code: `# Start timing
start_time = now()

# User clicks after the flash
reaction_time = now() - start_time
show(reaction_time)`,
      prediction: {
        prompt: "What does reaction_time measure?",
        type: "choice",
        options: ["How fast the click happened", "What color flashed", "How many buttons exist", "Not sure"],
        expected: "How fast the click happened"
      },
      runSuccess: "Input detected.\nReaction time measured.",
      conceptName: "difference",
      conceptLock: "A timer compares two moments: then and now.",
      snakeConnection: "Snake compares time to decide when to move again.",
      validationMode: "reaction-measure",
      optional: false
    },
    {
      id: "reaction-state",
      title: "Track State",
      stepLabel: "Step 4 / 7",
      goal: "Remember whether the game is waiting or ready.",
      instruction: "State tells the app what phase it is in. Waiting and ready are different states.",
      hint: `Set state to "waiting" first, then change it to "ready" after wait().`,
      code: `# Track the current state
state = "waiting"
wait()
state = "ready"
show("green")`,
      prediction: {
        prompt: "What is the final state?",
        type: "text",
        expected: "ready"
      },
      runSuccess: "State changed.\nwaiting → ready",
      conceptName: "state",
      conceptLock: "State is the current condition of the program.",
      snakeConnection: "Snake uses state for playing, paused, game over, and restarting.",
      validationMode: "reaction-state",
      optional: false
    },
    {
      id: "reaction-early-click",
      title: "Handle Early Clicks",
      stepLabel: "Step 5 / 7",
      goal: "Make clicks mean different things in different states.",
      instruction: "A click before ready should not count. State changes what input means.",
      hint: `Use if state == "waiting": and if state == "ready": on separate lines.`,
      code: `# If the user clicks too early
if state == "waiting":
    show("too early")

if state == "ready":
    show("clicked")`,
      prediction: {
        prompt: "What should happen if the user clicks while waiting?",
        type: "choice",
        options: ["too early", "clicked", "green", "Not sure"],
        expected: "too early"
      },
      runSuccess: "Logic confirmed.\nThe click response depends on state.",
      conceptName: "conditional",
      conceptLock: "A condition chooses what happens based on current state.",
      snakeConnection: "Snake checks conditions for collision, apple pickup, and game over.",
      validationMode: "reaction-conditional",
      optional: false
    },
    {
      id: "reaction-button-event",
      title: "Connect the Click",
      stepLabel: "Step 6 / 7",
      goal: "Make the click run the reaction check.",
      instruction: "The click event runs the reaction logic.",
      hint: `The function is check_reaction. Connect it with:
button.on_click(check_reaction)`,
      code: `# Define the click response
def check_reaction():
    reaction_time = now() - start_time
    show(reaction_time)

# Connect the click
button.on_click(check_reaction)`,
      prediction: {
        prompt: "What should happen when the button is clicked after the flash?",
        type: "text",
        expected: "reaction time shows"
      },
      runSuccess: "Button connected.\nClick triggered check_reaction().",
      conceptName: "event",
      conceptLock: "An event can run timing logic when the user clicks.",
      snakeConnection: "Snake uses keyboard events to trigger movement changes.",
      validationMode: "reaction-button-event",
      optional: false
    },
    {
      id: "reaction-complete-loop",
      title: "Complete the Timer",
      stepLabel: "Step 7 / 7",
      goal: "Put the reaction timer together.",
      instruction: "The timer waits, flashes, then measures the click.",
      hint: `All pieces need to be in order: state, wait, ready, start_time, def, button.`,
      code: `# Start waiting
state = "waiting"
wait()

# Flash ready
state = "ready"
start_time = now()
show("green")

# Click measures reaction
def check_reaction():
    reaction_time = now() - start_time
    show(reaction_time)

button.on_click(check_reaction)`,
      prediction: {
        prompt: "What are the three phases?",
        type: "choice",
          options: ["wait → flash → measure", "roll → flash → score", "click → dice → color", "Not sure"],
          expected: "wait → flash → measure"
      },
      runSuccess: "Input detected.\nReaction loop working.",
      conceptName: "state loop",
      conceptLock: "The app moves through states: waiting, ready, measured.",
      snakeConnection: "Snake also moves through states while the game loop runs.",
      validationMode: "reaction-complete",
      optional: false
    }
  ],
  clicker: [
    {
      id: "clicker-see-count",
      title: "See the Count",
      stepLabel: "Step 1 / 6",
      goal: "Watch a number become output.",
      instruction: "Click Run. You are looking for a score value.",
      hint: `A score starts as stored state.
Try:
score = 0
show(score)`,
      code: `# Show the starting score
score = 0
show(score)`,
      prediction: {
        prompt: "What should appear?",
        type: "choice",
        options: ["0", "1", "A color", "Not sure"],
        expected: "0"
      },
      runSuccess: "Output confirmed.\nScore shown: 0.",
      conceptName: "score",
      conceptLock: "A score is stored state that can be shown on screen.",
      snakeConnection: "Snake shows score after apples are eaten.",
      validationMode: "clicker-show-score",
      optional: false
    },
    {
      id: "clicker-store-score",
      title: "Store the Score",
      stepLabel: "Step 2 / 6",
      goal: "Store the starting score.",
      instruction: "A counter needs a value to remember before it can change.",
      hint: `Store the score in one variable:
score = 0`,
      code: `# Store the score
score = 0`,
      prediction: {
        prompt: "What variable stores the score?",
        type: "text",
        expected: "score"
      },
      runSuccess: "State stored.\nscore starts at 0.",
      conceptName: "state",
      conceptLock: "State is what the program remembers right now.",
      snakeConnection: "Snake remembers score between apple pickups.",
      validationMode: "clicker-store-score",
      optional: false
    },
    {
      id: "clicker-add-one",
      title: "Add One",
      stepLabel: "Step 3 / 6",
      goal: "Increase the score by one.",
      instruction: "A counter changes by taking the old value and adding one.",
      hint: `Use the old score to make the new score:
score = score + 1`,
      code: `# Start score
score = 0

# Add one point
score = score + 1
show(score)`,
      prediction: {
        prompt: "What should the score become?",
        type: "choice",
        options: ["0", "1", "2", "Not sure"],
        expected: "1"
      },
      runSuccess: "Output confirmed.\nscore increased to 1.",
      conceptName: "increment",
      conceptLock: "Increment means increase a stored number by a small amount.",
      snakeConnection: "Snake increments score when an apple is eaten.",
      validationMode: "clicker-increment",
      optional: false
    },
    {
      id: "clicker-name-action",
      title: "Name the Click",
      stepLabel: "Step 4 / 6",
      goal: "Put the score change inside a named action.",
      instruction: "A function packages the score update so it can run again.",
      hint: `Define add_point(), indent the score update, then call add_point().`,
      code: `# Name the score action
def add_point():
    score = 0
    score = score + 1
    show(score)

add_point()`,
      prediction: {
        prompt: "Which line runs the action?",
        type: "choice",
        options: ["def add_point():", "score = 0", "show(score)", "add_point()"],
        expected: "add_point()"
      },
      runSuccess: "Working.\nadd_point() updated the score.",
      conceptName: "function",
      conceptLock: "A function is a named action the program can run.",
      snakeConnection: "Snake uses named actions for movement, scoring, and restart logic.",
      validationMode: "clicker-function",
      optional: false
    },
    {
      id: "clicker-button-event",
      title: "Connect the Click",
      stepLabel: "Step 5 / 6",
      goal: "Make a button run the score update.",
      instruction: "The click event can trigger add_point later.",
      hint: `Pass the function name without parentheses:
button.on_click(add_point)`,
      code: `# Define the score action
def add_point():
    score = score + 1
    show(score)

button.on_click(add_point)`,
      prediction: {
        prompt: "What should the button click run?",
        type: "text",
        expected: "add_point"
      },
      runSuccess: "Button connected.\nClick can run add_point.",
      conceptName: "event",
      conceptLock: "An event can run a function when the user interacts.",
      snakeConnection: "Snake uses events to respond to player input.",
      validationMode: "clicker-button-event",
      optional: false
    },
    {
      id: "clicker-complete",
      title: "Complete the Counter",
      stepLabel: "Step 6 / 6",
      goal: "Put the counter together.",
      instruction: "The counter stores score, updates it, shows it, and connects the click.",
      hint: `Use all four pieces: score, def add_point(), show(score), button.on_click(add_point).`,
      code: `# Starting score
score = 0

def add_point():
    score = score + 1
    show(score)

button.on_click(add_point)`,
      prediction: {
        prompt: "What changes when the click runs?",
        type: "choice",
        options: ["The score", "The color", "The project name", "Not sure"],
        expected: "The score"
      },
      runSuccess: "Counter complete.\nScore updates are connected.",
      conceptName: "feedback loop",
      conceptLock: "A feedback loop updates state, shows the result, and waits for the next input.",
      snakeConnection: "Snake repeats input, state update, screen update, and score feedback.",
      validationMode: "clicker-complete",
      optional: false
    }
  ],
  rps: [
    {
      id: "rps-store-choice",
      title: "Store Your Choice",
      stepLabel: "Step 1 / 6",
      goal: "Store the player move.",
      instruction: "A choice starts as one stored value.",
      hint: `Store a supported move:
player = "rock"
show(player)`,
      code: `# Store the player move
player = "rock"
show(player)`,
      prediction: {
        prompt: "What move should show?",
        type: "choice",
        options: ["rock", "paper", "scissors", "Not sure"],
        expected: "rock"
      },
      runSuccess: "Choice stored.\nplayer is rock.",
      conceptName: "choice",
      conceptLock: "A choice is a stored value the program can compare later.",
      snakeConnection: "Snake stores choices like direction and restart state.",
      validationMode: "rps-player-choice",
      optional: false
    },
    {
      id: "rps-computer-choice",
      title: "Computer Chooses",
      stepLabel: "Step 2 / 6",
      goal: "Let the program choose a move.",
      instruction: "A list gives the computer possible moves. random_choice picks one.",
      hint: `Put all moves in a list, then choose from it:
computer = random_choice(moves)`,
      code: `# Computer move options
moves = ["rock", "paper", "scissors"]
computer = random_choice(moves)
show(computer)`,
      prediction: {
        prompt: "Will the same move appear every time?",
        type: "choice",
        options: ["Yes", "No", "Only rock", "Not sure"],
        expected: "No"
      },
      runSuccess: "Computer move selected.",
      conceptName: "random choice",
      conceptLock: "random_choice picks one value from a list.",
      snakeConnection: "Snake uses random placement for apples.",
      validationMode: "rps-random-choice",
      optional: false
    },
    {
      id: "rps-show-both",
      title: "Show Both Choices",
      stepLabel: "Step 3 / 6",
      goal: "Display player and computer choices.",
      instruction: "Before deciding a result, show the values being compared.",
      hint: `Show both stored values:
show(player)
show(computer)`,
      code: `# Player and computer choices
player = "rock"
moves = ["rock", "paper", "scissors"]
computer = random_choice(moves)

show(player)
show(computer)`,
      prediction: {
        prompt: "What values should appear?",
        type: "choice",
        options: ["Player only", "Computer only", "Both choices", "Not sure"],
        expected: "Both choices"
      },
      runSuccess: "Both choices are visible.",
      conceptName: "comparison setup",
      conceptLock: "A program compares stored values after they exist.",
      snakeConnection: "Snake checks stored positions before deciding what happens.",
      validationMode: "rps-show-both",
      optional: false
    },
    {
      id: "rps-compare-same",
      title: "Detect a Tie",
      stepLabel: "Step 4 / 6",
      goal: "Use a condition to detect matching choices.",
      instruction: "When both choices match, the result is a tie.",
      hint: `Compare the two stored values:
if player == computer:`,
      code: `# Tie check
player = "rock"
computer = "rock"

if player == computer:
    result = "tie"

show(result)`,
      prediction: {
        prompt: "What result should show?",
        type: "choice",
        options: ["tie", "player wins", "computer wins", "Not sure"],
        expected: "tie"
      },
      runSuccess: "Condition confirmed.\nMatching choices make a tie.",
      conceptName: "condition",
      conceptLock: "A condition chooses what happens when a comparison is true.",
      snakeConnection: "Snake uses conditions for collisions and apple pickup.",
      validationMode: "rps-tie-condition",
      optional: false
    },
    {
      id: "rps-win-condition",
      title: "Decide a Win",
      stepLabel: "Step 5 / 6",
      goal: "Use a condition for one winning case.",
      instruction: "One rule is enough to see how decision logic works.",
      hint: `Check the exact winning pair:
if player == "rock" and computer == "scissors":`,
      code: `# One winning rule
player = "rock"
computer = "scissors"

if player == "rock" and computer == "scissors":
    result = "player wins"

show(result)`,
      prediction: {
        prompt: "Who wins in this rule?",
        type: "choice",
        options: ["player wins", "tie", "computer wins", "Not sure"],
        expected: "player wins"
      },
      runSuccess: "Decision confirmed.\nRock beats scissors.",
      conceptName: "comparison",
      conceptLock: "A compound condition can compare more than one stored value.",
      snakeConnection: "Snake combines conditions to decide score, movement, and game over.",
      validationMode: "rps-win-condition",
      optional: false
    },
    {
      id: "rps-complete",
      title: "Complete the Game",
      stepLabel: "Step 6 / 6",
      goal: "Put the decision loop together.",
      instruction: "Store choices, pick a random move, compare values, and show the result.",
      hint: `Use player, moves, computer, tie condition, win condition, and show(result).`,
      code: `# Player and computer choices
player = "rock"
moves = ["rock", "paper", "scissors"]
computer = random_choice(moves)

if player == computer:
    result = "tie"

if player == "rock" and computer == "scissors":
    result = "player wins"

show(result)`,
      prediction: {
        prompt: "What decides the result?",
        type: "choice",
        options: ["conditions", "line numbers", "font size", "Not sure"],
        expected: "conditions"
      },
      runSuccess: "Decision logic connected.\nResult is shown.",
      conceptName: "decision logic",
      conceptLock: "Decision logic compares state and chooses the next result.",
      snakeConnection: "Snake uses decision logic for collision, apple pickup, game over, and restart.",
      validationMode: "rps-complete",
      optional: false
    }
  ]
};

const completionData = {
  color: {
    title: "Color Flasher Built",
    message: "That's a working Color Flasher. Yours now.",
    console: "Shipped.",
    systemsUnlocked: ["variable", "function", "event", "state change", "screen update"],
    snakeConnection: "Color Flasher taught: click → code runs → screen changes."
  },
  dice: {
    title: "Dice Roller Built",
    message: "That's a working Dice Roller. Yours now.",
    console: "Shipped.",
    systemsUnlocked: ["variable", "random number", "function", "event", "visual output"],
    snakeConnection: "Dice Roller taught: random value → visual result."
  },
  reaction: {
    title: "Reaction Timer Built",
    message: "That's a working Reaction Timer. Yours now.",
    console: "Shipped.",
    systemsUnlocked: ["state", "time", "event", "condition", "input"],
    snakeConnection: "Reaction Timer taught: input changes behavior based on state."
  },
  clicker: {
    title: "Click Counter Built",
    message: "That's a working Click Counter. Yours now.",
    console: "Shipped.",
    systemsUnlocked: ["state", "increment", "event", "score", "screen update"],
    snakeConnection: "Click Counter taught: score changes when an event happens."
  },
  rps: {
    title: "Rock Paper Scissors Built",
    message: "That's working decision logic. Yours now.",
    console: "Shipped.",
    systemsUnlocked: ["choice", "random choice", "condition", "comparison", "result"],
    snakeConnection: "Rock Paper Scissors taught: conditions decide what happens next."
  }
};

const IGNITION_PROJECT_IDS = ["color", "dice", "reaction"];
const LEVEL1_PROJECT_IDS = ["clicker", "rps"];

const VALID_SCREENS = new Set([
  "home",
  "hub",
  "brief",
  "workspace",
  "complete",
  "ignitionComplete",
  "level1Intro",
  "paywall",
  "map",
  "dashboard",
  "settings"
]);

const VALID_PROJECTS = new Set([...IGNITION_PROJECT_IDS, ...LEVEL1_PROJECT_IDS]);

const FOCUS_TERMS_BY_MODE = {
  "color-show": [{ term: "show", type: "function" }, { term: "teal", type: "value" }],
  "color-assignment": [{ term: "color", type: "variable" }, { term: "teal", type: "value" }],
  "color-show-variable": [{ term: "color", type: "variable" }, { term: "show", type: "function" }],
  "color-final-assignment": [{ term: "color", type: "variable" }, { term: "show", type: "function" }, { term: "orange", type: "value" }],
  "function-call": [{ term: "flash_color", type: "function" }, { term: "show", type: "function" }, { term: "color", type: "variable" }],
  "button-event": [{ term: "button.on_click", type: "event" }, { term: "flash_color", type: "function" }],
  "random-color": [{ term: "colors", type: "variable" }, { term: "random_choice", type: "random" }, { term: "color", type: "variable" }],
  "dice-random-number": [{ term: "roll", type: "variable" }, { term: "random_number", type: "random" }, { term: "show", type: "function" }],
  "dice-roll-variable": [{ term: "roll", type: "variable" }, { term: "random_number", type: "random" }, { term: "show", type: "function" }],
  "dice-message": [{ term: "message", type: "variable" }, { term: "roll", type: "variable" }, { term: "show", type: "function" }],
  "dice-visual": [{ term: "show_dice", type: "function" }, { term: "roll", type: "variable" }],
  "dice-function": [{ term: "roll_die", type: "function" }, { term: "show_dice", type: "function" }, { term: "roll", type: "variable" }],
  "dice-button-event": [{ term: "button.on_click", type: "event" }, { term: "roll_die", type: "function" }],
  "dice-repeat": [{ term: "button.on_click", type: "event" }, { term: "roll_die", type: "function" }, { term: "roll", type: "variable" }],
  "reaction-flash": [{ term: "wait", type: "function" }, { term: "flash", type: "function" }, { term: "green", type: "value" }],
  "reaction-start-time": [{ term: "start_time", type: "variable" }, { term: "now", type: "function" }, { term: "show", type: "function" }],
  "reaction-measure": [{ term: "reaction_time", type: "variable" }, { term: "start_time", type: "variable" }, { term: "now", type: "function" }],
  "reaction-state": [{ term: "state", type: "variable" }, { term: "waiting", type: "value" }, { term: "ready", type: "value" }],
  "reaction-conditional": [{ term: "==", type: "condition" }, { term: "if", type: "condition" }, { term: "state", type: "variable" }, { term: "waiting", type: "value" }, { term: "ready", type: "value" }],
  "reaction-button-event": [{ term: "check_reaction", type: "function" }, { term: "button.on_click", type: "event" }, { term: "reaction_time", type: "variable" }],
  "reaction-complete": [{ term: "==", type: "condition" }, { term: "state", type: "variable" }, { term: "wait", type: "function" }, { term: "start_time", type: "variable" }, { term: "check_reaction", type: "function" }, { term: "button.on_click", type: "event" }],
  "clicker-show-score": [{ term: "score", type: "variable" }, { term: "show", type: "function" }],
  "clicker-store-score": [{ term: "score", type: "variable" }],
  "clicker-increment": [{ term: "score + 1", type: "operation" }, { term: "score", type: "variable" }, { term: "show", type: "function" }],
  "clicker-function": [{ term: "add_point", type: "function" }, { term: "score + 1", type: "operation" }, { term: "score", type: "variable" }],
  "clicker-button-event": [{ term: "button.on_click", type: "event" }, { term: "add_point", type: "function" }, { term: "score", type: "variable" }],
  "clicker-complete": [{ term: "button.on_click", type: "event" }, { term: "add_point", type: "function" }, { term: "score + 1", type: "operation" }, { term: "score", type: "variable" }],
  "rps-player-choice": [{ term: "player", type: "variable" }, { term: "rock", type: "value" }, { term: "show", type: "function" }],
  "rps-random-choice": [{ term: "computer", type: "variable" }, { term: "random_choice", type: "random" }, { term: "moves", type: "variable" }],
  "rps-show-both": [{ term: "player", type: "variable" }, { term: "computer", type: "variable" }, { term: "random_choice", type: "random" }],
  "rps-tie-condition": [{ term: "==", type: "condition" }, { term: "if", type: "condition" }, { term: "player", type: "variable" }, { term: "computer", type: "variable" }, { term: "result", type: "variable" }, { term: "tie", type: "value" }],
  "rps-win-condition": [{ term: "==", type: "condition" }, { term: "if", type: "condition" }, { term: "player", type: "variable" }, { term: "computer", type: "variable" }, { term: "result", type: "variable" }, { term: "player wins", type: "value" }],
  "rps-complete": [{ term: "==", type: "condition" }, { term: "if", type: "condition" }, { term: "player", type: "variable" }, { term: "computer", type: "variable" }, { term: "result", type: "variable" }, { term: "tie", type: "value" }, { term: "player wins", type: "value" }]
};

const PREDICTION_FEEDBACK_BY_MODE = {
  "color-show": {
    feedback: {
      "The text": "This chunk does not update text. show(\"teal\") sends a color value to the visual output.",
      "The color": "show(\"teal\") sends a color value to the screen, so the visual output changes color.",
      "The score": "No score variable exists in this chunk yet. The only signal is color.",
      "Not sure": "No problem. The signal to watch is show(\"teal\"), which changes the visual output color."
    }
  },
  "dice-random-number": {
    feedback: {
      "A color": "This chunk does not send a color value. random_number(1, 6) creates a number.",
      "A number from 1 to 6": "random_number(1, 6) creates a die value in that range.",
      "A word": "No message string is built yet. This chunk shows the number directly.",
      "Not sure": "No problem. Watch the value stored in roll."
    }
  },
  "reaction-flash": {
    feedback: {
      "The screen flashes": "wait() delays the signal, then flash(\"green\") changes the visual output.",
      "The dice rolls": "No random number or dice function runs in this chunk.",
      "The score resets": "No score variable exists here. This chunk is about timed output.",
      "Not sure": "No problem. Watch what happens after wait()."
    }
  }
};

const SNAKE_LENS_BY_MODE = {
  "color-show": {
    systemName: "Screen Redraw",
    snakeSnippet: `draw_board()
draw_snake(snake)
draw_apple(apple)`,
    explanation: "Color Flasher changes the screen after code runs. Snake redraws the board after each move."
  },
  "color-assignment": {
    systemName: "Stored Visual State",
    snakeSnippet: `snake_color = "teal"
draw_snake(snake_color)`,
    explanation: "The lesson stores a color. Snake stores values, then uses them when drawing."
  },
  "color-show-variable": {
    systemName: "Draw Stored State",
    snakeSnippet: `snake_color = "teal"
draw_snake(snake_color)`,
    explanation: "show(color) sends stored state to output. Snake draws stored positions and values."
  },
  "color-final-assignment": {
    systemName: "Current State Wins",
    snakeSnippet: `direction = "right"
direction = "down"
move_snake(direction)`,
    explanation: "The last stored value is current state. Snake uses the current direction when it moves."
  },
  "function-call": {
    systemName: "Named Action",
    snakeSnippet: `def draw_snake():
    draw_segments(snake)

draw_snake()`,
    explanation: "A named action keeps repeated Snake behavior readable and reusable."
  },
  "button-event": {
    systemName: "Input Event",
    snakeSnippet: `def turn_left():
    direction = "left"

keyboard.on_press(turn_left)`,
    explanation: "A click can trigger code now. Snake uses keyboard events to trigger direction changes."
  },
  "random-color": {
    systemName: "Random Choice",
    snakeSnippet: `open_tiles = find_empty_tiles()
apple = random_choice(open_tiles)`,
    explanation: "The same random-choice pattern places each new apple."
  },
  "dice-random-number": {
    systemName: "Random Apple Position",
    snakeSnippet: `apple_x = random_number(0, board_width)
apple_y = random_number(0, board_height)`,
    explanation: "Dice Roller creates a random number. Snake uses random numbers to place apples."
  },
  "dice-roll-variable": {
    systemName: "Store Random Position",
    snakeSnippet: `apple_position = random_tile()
draw_apple(apple_position)`,
    explanation: "The random result is stored before the screen uses it."
  },
  "dice-message": {
    systemName: "Status Message",
    snakeSnippet: `message = "Score: " + score
show(message)`,
    explanation: "Snake uses readable messages for score, restart, and game-over states."
  },
  "dice-visual": {
    systemName: "Data-Driven Visual",
    snakeSnippet: `for segment in snake:
    draw_tile(segment)`,
    explanation: "A number can control a visual. Snake data controls where each body segment appears."
  },
  "dice-function": {
    systemName: "Reusable Random Action",
    snakeSnippet: `def spawn_apple():
    apple = random_tile()
    draw_apple(apple)

spawn_apple()`,
    explanation: "Snake packages apple spawning as a named action."
  },
  "dice-button-event": {
    systemName: "Event Runs Action",
    snakeSnippet: `def restart_game():
    spawn_apple()

button.on_click(restart_game)`,
    explanation: "Events can run named actions later."
  },
  "dice-repeat": {
    systemName: "Repeated Action",
    snakeSnippet: `while playing:
    move_snake()
    draw_board()`,
    explanation: "Snake repeats the same structure while values keep changing."
  },
  "reaction-flash": {
    systemName: "Timed Update",
    snakeSnippet: `wait(tick_speed)
move_snake()
draw_board()`,
    explanation: "Reaction Timer waits before changing output. Snake waits between movement ticks."
  },
  "reaction-start-time": {
    systemName: "Timing State",
    snakeSnippet: `last_tick = now()
move_snake()`,
    explanation: "Snake stores time so it knows when the next movement should happen."
  },
  "reaction-measure": {
    systemName: "Time Difference",
    snakeSnippet: `if now() - last_tick > tick_speed:
    move_snake()`,
    explanation: "Snake compares time values to decide when to move again."
  },
  "reaction-state": {
    systemName: "Game Phase",
    snakeSnippet: `state = "playing"
if collision:
    state = "game_over"`,
    explanation: "Snake uses state to know whether it is playing, paused, or finished."
  },
  "reaction-conditional": {
    systemName: "State Check",
    snakeSnippet: `if state == "playing":
    move_snake()

if state == "game_over":
    show("restart")`,
    explanation: "Conditions make behavior depend on the current game state."
  },
  "reaction-button-event": {
    systemName: "Input Handler",
    snakeSnippet: `def change_direction():
    direction = next_direction

keyboard.on_press(change_direction)`,
    explanation: "Snake responds to input by running movement logic."
  },
  "reaction-complete": {
    systemName: "State Loop",
    snakeSnippet: `state = "playing"
while state == "playing":
    move_snake()
    check_collision()
    draw_board()`,
    explanation: "Snake is a loop of state, input, checks, and screen updates."
  },
  "clicker-show-score": {
    systemName: "Score Display",
    snakeSnippet: `score = 0
show_score(score)`,
    explanation: "Click Counter shows score directly. Snake shows score after apples are eaten."
  },
  "clicker-store-score": {
    systemName: "Stored Score",
    snakeSnippet: `score = 0
apple_count = score`,
    explanation: "Snake keeps score as stored state."
  },
  "clicker-increment": {
    systemName: "Apple Score Update",
    snakeSnippet: `if snake_head == apple:
    score = score + 1
    show_score(score)`,
    explanation: "Click Counter adds one after a click. Snake adds one after an apple."
  },
  "clicker-function": {
    systemName: "Score Function",
    snakeSnippet: `def eat_apple():
    score = score + 1
    show_score(score)

eat_apple()`,
    explanation: "Snake can package score updates as a named action."
  },
  "clicker-button-event": {
    systemName: "Scoring Event",
    snakeSnippet: `def eat_apple():
    score = score + 1

on_apple_collision(eat_apple)`,
    explanation: "An event triggers the score update."
  },
  "clicker-complete": {
    systemName: "Score Feedback Loop",
    snakeSnippet: `score = 0

def eat_apple():
    score = score + 1
    show_score(score)

on_apple_collision(eat_apple)`,
    explanation: "Snake uses a feedback loop: event happens, state changes, screen updates."
  },
  "rps-player-choice": {
    systemName: "Player Choice",
    snakeSnippet: `direction = "right"
move_snake(direction)`,
    explanation: "RPS stores a player choice. Snake stores the chosen direction."
  },
  "rps-random-choice": {
    systemName: "Random System Choice",
    snakeSnippet: `open_tiles = find_empty_tiles()
apple = random_choice(open_tiles)`,
    explanation: "RPS lets the program choose. Snake lets the program choose apple placement."
  },
  "rps-show-both": {
    systemName: "Compare State",
    snakeSnippet: `snake_head = snake[0]
apple_position = apple`,
    explanation: "Snake compares stored values to decide what happened."
  },
  "rps-tie-condition": {
    systemName: "Collision Match",
    snakeSnippet: `if snake_head == apple:
    result = "apple eaten"`,
    explanation: "A tie checks whether two values match. Snake checks whether the head matches the apple."
  },
  "rps-win-condition": {
    systemName: "Outcome Rule",
    snakeSnippet: `if snake_head == wall:
    result = "game over"`,
    explanation: "RPS uses a rule to decide a win. Snake uses rules to decide collisions and game over."
  },
  "rps-complete": {
    systemName: "Decision System",
    snakeSnippet: `if snake_head == apple:
    score = score + 1

if snake_head == wall:
    state = "game_over"`,
    explanation: "Snake depends on decision logic: compare state, choose the result, update the game."
  }
};

const SNAKE_LENS_DEMO_TYPES = {
  "color-show": "redraw",
  "color-assignment": "redraw",
  "color-show-variable": "redraw",
  "color-final-assignment": "redraw",
  "function-call": "redraw",
  "reaction-flash": "redraw",
  "random-color": "random",
  "dice-random-number": "random",
  "dice-roll-variable": "random",
  "dice-function": "random",
  "dice-button-event": "random",
  "reaction-start-time": "timing",
  "reaction-measure": "timing",
  "reaction-complete": "timing",
  "dice-repeat": "timing",
  "clicker-show-score": "score",
  "clicker-store-score": "score",
  "clicker-increment": "score",
  "clicker-function": "score",
  "clicker-button-event": "score",
  "clicker-complete": "score",
  "rps-player-choice": "condition",
  "rps-random-choice": "condition",
  "rps-show-both": "condition",
  "rps-tie-condition": "condition",
  "rps-win-condition": "condition",
  "rps-complete": "condition",
  "button-event": "condition",
  "reaction-state": "condition",
  "reaction-conditional": "condition",
  "reaction-button-event": "condition",
  "dice-message": "condition",
  "dice-visual": "condition"
};

const SNAKE_LENS_HIGHLIGHT_LINES = {
  "color-show": "draw_board()",
  "color-assignment": "draw_snake(snake_color)",
  "color-show-variable": "draw_snake(snake_color)",
  "color-final-assignment": "move_snake(direction)",
  "function-call": "draw_snake()",
  "button-event": "keyboard.on_press(turn_left)",
  "random-color": "apple = random_choice(open_tiles)",
  "dice-random-number": "apple_x = random_number(0, board_width)",
  "dice-roll-variable": "apple_position = random_tile()",
  "dice-message": "message = \"Score: \" + score",
  "dice-visual": "draw_tile(segment)",
  "dice-function": "apple = random_tile()",
  "dice-button-event": "button.on_click(restart_game)",
  "dice-repeat": "move_snake()",
  "reaction-flash": "draw_board()",
  "reaction-start-time": "last_tick = now()",
  "reaction-measure": "if now() - last_tick > tick_speed:",
  "reaction-state": "if collision:",
  "reaction-conditional": "if state == \"playing\":",
  "reaction-button-event": "keyboard.on_press(change_direction)",
  "reaction-complete": "while state == \"playing\":",
  "clicker-show-score": "show_score(score)",
  "clicker-store-score": "score = 0",
  "clicker-increment": "score = score + 1",
  "clicker-function": "score = score + 1",
  "clicker-button-event": "score = score + 1",
  "clicker-complete": "score = score + 1",
  "rps-player-choice": "move_snake(direction)",
  "rps-random-choice": "apple = random_choice(open_tiles)",
  "rps-show-both": "snake_head = snake[0]",
  "rps-tie-condition": "if snake_head == apple:",
  "rps-win-condition": "if snake_head == wall:",
  "rps-complete": "if snake_head == apple:"
};

const SNAKE_LENS_CAPTIONS = {
  redraw: "Board redraws every move.",
  random: "Apple placed at a random tile.",
  timing: "Snake waits before each move.",
  score: "Score updates when apple is eaten.",
  condition: "Different outcomes from different collisions."
};

const SYSTEM_CAPABILITY_BY_MODE = {
  "color-assignment": "stores-value",
  "color-show-variable": "stores-value",
  "color-final-assignment": "stores-value",
  "dice-roll-variable": "stores-value",
  "clicker-store-score": "stores-value",
  "rps-player-choice": "stores-value",
  "rps-show-both": "stores-value",
  "color-show": "updates-display",
  "function-call": "updates-display",
  "reaction-flash": "updates-display",
  "dice-visual": "updates-display",
  "clicker-show-score": "updates-display",
  "button-event": "responds-to-input",
  "dice-button-event": "responds-to-input",
  "reaction-button-event": "responds-to-input",
  "clicker-button-event": "responds-to-input",
  "reaction-start-time": "handles-time",
  "reaction-measure": "handles-time",
  "reaction-state": "handles-time",
  "reaction-conditional": "handles-time",
  "reaction-complete": "handles-time",
  "dice-repeat": "handles-time",
  "random-color": "uses-randomness",
  "dice-random-number": "uses-randomness",
  "dice-function": "uses-randomness",
  "rps-random-choice": "uses-randomness",
  "clicker-increment": "tracks-score",
  "clicker-function": "tracks-score",
  "clicker-complete": "tracks-score",
  "dice-message": "tracks-score",
  "rps-tie-condition": "makes-decisions",
  "rps-win-condition": "makes-decisions",
  "rps-complete": "makes-decisions"
};

const SYSTEM_CAPABILITIES = {
  "stores-value": {
    title: "Stores values",
    description: "The system can hold a value in memory and use it later."
  },
  "updates-display": {
    title: "Updates the display",
    description: "The system can redraw visible output when something changes."
  },
  "responds-to-input": {
    title: "Responds to input",
    description: "The system can react to user-triggered events."
  },
  "handles-time": {
    title: "Handles time",
    description: "The system can wait, measure, and respond based on timing."
  },
  "uses-randomness": {
    title: "Uses randomness",
    description: "The system can generate unpredictable values within a range."
  },
  "tracks-score": {
    title: "Tracks progress",
    description: "The system can count, store, and display a changing value."
  },
  "makes-decisions": {
    title: "Makes decisions",
    description: "The system can choose different outcomes based on current state."
  }
};

const LESSON_AXIS = {
  "function-call": "cause",
  "button-event": "cause",
  "random-color": "cause",
  "dice-function": "cause",
  "dice-button-event": "cause",
  "dice-repeat": "cause",
  "reaction-flash": "cause",
  "reaction-button-event": "cause",
  "clicker-function": "cause",
  "clicker-button-event": "cause",
  "reaction-state": "control",
  "reaction-conditional": "control",
  "reaction-complete": "control",
  "rps-tie-condition": "control",
  "rps-win-condition": "control",
  "rps-complete": "control",
  "color-show-variable": "state",
  "color-final-assignment": "state",
  "dice-roll-variable": "state",
  "dice-message": "state",
  "reaction-start-time": "state",
  "reaction-measure": "state",
  "clicker-show-score": "state",
  "clicker-store-score": "state",
  "clicker-increment": "state",
  "rps-player-choice": "state",
  "rps-random-choice": "state",
  "rps-show-both": "state"
};

const AXIS_TRACE_BY_MODE = {
  "button-event": {
    trigger: "button click",
    logic: "button.on_click(flash_color)",
    result: "flash_color() ran",
    why: "Event-driven code waits for a trigger before running"
  },
  "function-call": {
    trigger: "function called by name",
    logic: "flash_color() in the code body",
    result: "flash_color() ran immediately",
    why: "Calling a function by name transfers control to it"
  },
  "dice-function": {
    trigger: "roll() called",
    logic: "def roll(): wraps the random logic",
    result: "roll() ran, die face updated",
    why: "Functions package logic so it can be triggered on demand"
  },
  "dice-button-event": {
    trigger: "button click",
    logic: "button.on_click(roll)",
    result: "roll() ran",
    why: "The button is the trigger; the function is the response"
  },
  "dice-repeat": {
    trigger: "repeat(10) fires",
    logic: "repeat(10, roll)",
    result: "roll() ran 10 times",
    why: "Repetition is a trigger that fires a function multiple times"
  },
  "reaction-flash": {
    trigger: "wait() completes",
    logic: "wait() → flash('green')",
    result: "flash('green') ran after delay",
    why: "A timer is a trigger — code waits before responding"
  },
  "reaction-button-event": {
    trigger: "button click",
    logic: "button.on_click(record_click)",
    result: "record_click() ran",
    why: "The click is the trigger; the handler is the response"
  },
  "clicker-function": {
    trigger: "add_point() called",
    logic: "def add_point(): score += 1",
    result: "add_point() ran, score updated",
    why: "Functions are named triggers for reusable logic"
  },
  "clicker-button-event": {
    trigger: "button click",
    logic: "button.on_click(add_point)",
    result: "add_point() ran",
    why: "Binding connects the trigger to the function"
  },
  "random-color": {
    trigger: "function called",
    logic: "flash_color() picks random color",
    result: "flash_color() ran with new color",
    why: "Functions trigger randomness on demand"
  },
  "reaction-state": {
    trigger: "run executed",
    logic: "state = 'waiting' then state = 'ready'",
    result: "state variable controls what happens next",
    why: "State determines which branch runs on the next input"
  },
  "reaction-conditional": {
    trigger: "button click",
    logic: "if state == 'waiting' / if state == 'ready'",
    result: "one branch ran based on current state",
    why: "Conditions select behavior — same input, different outcome"
  },
  "reaction-complete": {
    trigger: "button click",
    logic: "if state == 'ready': record reaction time",
    result: "reaction time branch ran",
    why: "Control flow routes input to the correct handler"
  },
  "rps-tie-condition": {
    trigger: "player and computer choices compared",
    logic: "if player == computer: result = 'tie'",
    result: "tie branch ran",
    why: "Conditions check equality and choose a path"
  },
  "rps-win-condition": {
    trigger: "choices compared",
    logic: "if player beats computer: result = 'player wins'",
    result: "win branch ran",
    why: "Conditions route to different outcomes based on values"
  },
  "rps-complete": {
    trigger: "choices compared",
    logic: "if tie / if win / else lose",
    result: "one of three branches ran",
    why: "Full control flow covers every possible path"
  }
};

const LENS_AXIS_CAPTIONS = {
  "function-call": "Calling a function by name transfers control to it.",
  "button-event": "A button click is a trigger. Code waits until it fires.",
  "random-color": "The trigger runs logic that picks a fresh value.",
  "dice-function": "A named function packages the roll so it can run on demand.",
  "dice-button-event": "The button is the trigger. The roll function is the response.",
  "dice-repeat": "A repeating trigger runs the same response multiple times.",
  "reaction-flash": "A timer can trigger code after a pause.",
  "reaction-button-event": "The click triggers the handler that records input.",
  "clicker-function": "Calling the function runs the score update.",
  "clicker-button-event": "The button trigger connects directly to score logic.",
  "reaction-state": "State decides what the next input means.",
  "reaction-conditional": "Same input. Different state. Different branch runs.",
  "reaction-complete": "Control flow routes the click to the ready branch.",
  "rps-tie-condition": "A condition checks whether two values match.",
  "rps-win-condition": "A condition chooses the winning branch.",
  "rps-complete": "Every possible outcome needs its own branch."
};

const GLITCH_TOKENS = {
  "button-event": { event: "a button click", binding: "button.on_click(flash_color)", fn: "flash_color" },
  "function-call": { event: "a function call", binding: "flash_color()", fn: "flash_color" },
  "random-color": { event: "a function call", binding: "flash_color()", fn: "flash_color" },
  "dice-function": { event: "roll() called", binding: "def roll():", fn: "roll" },
  "dice-button-event": { event: "a button click", binding: "button.on_click(roll)", fn: "roll" },
  "dice-repeat": { event: "repeat(10) fires", binding: "repeat(10, roll)", fn: "roll" },
  "reaction-flash": { event: "wait() completes", binding: "wait() → flash('green')", fn: "the flash sequence" },
  "reaction-button-event": { event: "a button click", binding: "button.on_click(record_click)", fn: "record_click" },
  "clicker-function": { event: "add_point() called", binding: "def add_point():", fn: "add_point" },
  "clicker-button-event": { event: "a button click", binding: "button.on_click(add_point)", fn: "add_point" },
  "reaction-state": { condition: "state = 'waiting' then state = 'ready'" },
  "reaction-conditional": { condition: "if state == 'waiting' / if state == 'ready'" },
  "reaction-complete": { condition: "if state == 'ready': record reaction time" },
  "rps-tie-condition": { condition: "if player == computer" },
  "rps-win-condition": { condition: "if player beats computer" },
  "rps-complete": { condition: "if tie / if win / else lose" }
};

function getLessonAxis(validationMode) {
  return LESSON_AXIS[validationMode] || "result";
}

Object.entries(SNAKE_LENS_BY_MODE).forEach(([mode, lens]) => {
  lens.demoType = SNAKE_LENS_DEMO_TYPES[mode] || "redraw";
  lens.highlightLine = SNAKE_LENS_HIGHLIGHT_LINES[mode] || "";
});

function defaultPredictionFeedback(step) {
  const feedback = {};
  const options = step.prediction.options || [];
  options.forEach(option => {
    if (normalizePredictionValue(option) === "not sure") {
      feedback[option] = `No problem. The signal to watch is: ${step.prediction.expected}.`;
      return;
    }
    if (normalizePredictionValue(option) === normalizePredictionValue(step.prediction.expected)) {
      feedback[option] = `Prediction matched. The actual signal was: ${step.prediction.expected}.`;
      return;
    }
    feedback[option] = `Prediction differed. The actual signal was: ${step.prediction.expected}.`;
  });
  return feedback;
}

function applyLessonEnhancements() {
  Object.values(lessonData).forEach(steps => {
    steps.forEach(step => {
      if (!step.focusTerms) {
        step.focusTerms = FOCUS_TERMS_BY_MODE[step.validationMode] || [];
      }
      if (!step.snakeLens && SNAKE_LENS_BY_MODE[step.validationMode]) {
        step.snakeLens = {
          lessonSnippet: step.code,
          demoType: SNAKE_LENS_DEMO_TYPES[step.validationMode],
          highlightLine: SNAKE_LENS_HIGHLIGHT_LINES[step.validationMode],
          ...SNAKE_LENS_BY_MODE[step.validationMode]
        };
      }
      if (!step.prediction) return;
      const configured = PREDICTION_FEEDBACK_BY_MODE[step.validationMode] || {};
      const generatedFeedback = step.prediction.type === "choice" ? defaultPredictionFeedback(step) : {};
      step.prediction.feedback = {
        ...generatedFeedback,
        ...(configured.feedback || {}),
        ...(step.prediction.feedback || {})
      };
      if (!step.prediction.matchFeedback) {
        step.prediction.matchFeedback = configured.matchFeedback || `Prediction matched. The actual signal was: ${step.prediction.expected}.`;
      }
      if (!step.prediction.missFeedback) {
        step.prediction.missFeedback = configured.missFeedback || `Prediction differed. The actual signal was: ${step.prediction.expected}.`;
      }
      if (!step.prediction.notSureFeedback) {
        step.prediction.notSureFeedback = configured.notSureFeedback || `No problem. The signal to watch is: ${step.prediction.expected}.`;
      }
    });
  });
}

applyLessonEnhancements();

const state = {
  screen: "home",
  project: "dice",
  step: 0,
  code: {},
  prediction: "",
  predictionAnswer: "",
  log: "Output waiting.",
  focus: false,
  lineNumbers: true,
  completed: [],
  showConceptLock: false,
  stepStatus: {
    project: null,
    stepId: null,
    ran: false,
    success: false,
    message: ""
  },
  reward: {
    visible: false,
    type: "",
    message: "",
    project: null,
    stepId: null
  },
  outputResult: null,
  lastSuccessfulRun: {
    project: null,
    stepId: null
  },
  stepResults: {},
  recentlyCompletedProject: null,
  unlockedLevels: {
    level1: false
  },
  settings: {
    font: 1,
    reducedMotion: false,
    highContrast: false,
    theme: "Medium Neon"
  }
};

function safeRestoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem("glitchWorksState") || "{}");
    Object.assign(state, saved, {
      code: { ...state.code, ...(saved.code || {}) },
      settings: { ...state.settings, ...(saved.settings || {}) },
      stepStatus: { ...state.stepStatus, ...(saved.stepStatus || {}) },
      stepResults: { ...state.stepResults, ...(saved.stepResults || {}) },
      unlockedLevels: { ...state.unlockedLevels, ...(saved.unlockedLevels || {}) }
    });
  } catch (e) {
    localStorage.removeItem("glitchWorksState");
  }
  if (!state.code || typeof state.code !== "object" || Array.isArray(state.code)) {
    state.code = {};
  }
  if (!state.stepResults || typeof state.stepResults !== "object" || Array.isArray(state.stepResults)) {
    state.stepResults = {};
  }
  if (!state.stepStatus || typeof state.stepStatus !== "object" || Array.isArray(state.stepStatus)) {
    state.stepStatus = {
      project: null,
      stepId: null,
      ran: false,
      success: false,
      message: ""
    };
  }
  if (!state.settings || typeof state.settings !== "object" || Array.isArray(state.settings)) {
    state.settings = {
      font: 1,
      reducedMotion: false,
      highContrast: false,
      theme: "Medium Neon"
    };
  }
  if (!state.unlockedLevels || typeof state.unlockedLevels !== "object" || Array.isArray(state.unlockedLevels)) {
    state.unlockedLevels = {
      level1: false
    };
  }
  state.unlockedLevels.level1 = !!state.unlockedLevels.level1;
  state.settings.font = Number(state.settings.font);
  if (!Number.isFinite(state.settings.font)) state.settings.font = 1;
  state.settings.font = Math.min(Math.max(state.settings.font, 0.9), 1.25);
  state.settings.reducedMotion = state.settings.reducedMotion === true;
  state.settings.highContrast = state.settings.highContrast === true;
  if (!VALID_SCREENS.has(state.screen)) state.screen = "home";
  if (!VALID_PROJECTS.has(state.project)) state.project = "color";
  const maxStep = (lessonData[state.project] || []).length - 1;
  if (typeof state.step !== "number" || !Number.isInteger(state.step) || state.step < 0 || state.step > maxStep) {
    state.step = 0;
  }
  if (!Array.isArray(state.completed)) state.completed = [];
  state.completed = state.completed.filter(id => VALID_PROJECTS.has(id));
  state.reward = {
    visible: false,
    type: "",
    message: "",
    project: null,
    stepId: null
  };
  state.outputResult = null;
}

safeRestoreState();

const app = document.querySelector("#app");
let glitchState = "dormant";
let glitchEl = null;

function glitchSvgMarkup() {
  return `
    <svg class="glitch-svg" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="glitchFaceClip">
          <polygon points="36 18 84 18 101 39 94 88 72 104 42 100 22 80 20 40" />
        </clipPath>
      </defs>
      <g class="glitch-chroma">
        <polygon class="glitch-chroma-cyan" points="36 18 84 18 101 39 94 88 72 104 42 100 22 80 20 40" />
        <polygon class="glitch-chroma-pink" points="36 18 84 18 101 39 94 88 72 104 42 100 22 80 20 40" />
      </g>
      <polygon class="glitch-face-surface" points="36 18 84 18 101 39 94 88 72 104 42 100 22 80 20 40" />
      <g class="glitch-slices" clip-path="url(#glitchFaceClip)">
        <rect x="21" y="36" width="78" height="7" />
        <rect x="18" y="56" width="84" height="6" />
        <rect x="28" y="76" width="65" height="5" />
      </g>
      <g class="glitch-eyes">
        <rect class="glitch-eye" x="40" y="52" width="16" height="4" />
        <rect class="glitch-eye" x="68" y="52" width="16" height="4" />
      </g>
      <g class="glitch-fragments">
        <rect x="22" y="22" width="8" height="5" />
        <rect x="92" y="30" width="12" height="4" />
        <rect x="16" y="50" width="6" height="14" />
        <rect x="100" y="55" width="10" height="6" />
        <rect x="27" y="91" width="12" height="5" />
        <rect x="81" y="96" width="7" height="12" />
        <rect x="34" y="12" width="14" height="4" />
        <rect x="96" y="82" width="5" height="13" />
        <rect x="12" y="78" width="9" height="6" />
        <rect x="72" y="13" width="6" height="10" />
      </g>
    </svg>
  `;
}

function initGlitch() {
  if (glitchEl) return;
  glitchEl = document.createElement("div");
  glitchEl.className = "glitch-entity glitch--dormant";
  glitchEl.innerHTML = `
    <button type="button" class="glitch-face" aria-label="Ask The Glitch for a linear explanation">
      <span class="glitch-avatar-stack" aria-hidden="true">
        <img class="glitch-avatar glitch-avatar-main" src="assets/glitch-avatar.svg" alt="" />
        <img class="glitch-avatar glitch-avatar-cyan" src="assets/glitch-avatar.svg" alt="" />
        <img class="glitch-avatar glitch-avatar-pink" src="assets/glitch-avatar.svg" alt="" />
      </span>
      <span class="glitch-particles" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    <section class="glitch-bubble" aria-label="The Glitch explanation">
      <button type="button" class="glitch-close" aria-label="Close The Glitch explanation">×</button>
      <div class="glitch-bubble-copy"></div>
    </section>
  `;
  (document.getElementById("glitch-slot") || document.body).appendChild(glitchEl);

  glitchEl.addEventListener("mouseenter", () => {
    if (glitchState !== "thinking") setGlitchState("aware");
  });
  glitchEl.addEventListener("mouseleave", () => {
    if (glitchState === "aware") setGlitchState("dormant");
  });
  glitchEl.querySelector(".glitch-face").addEventListener("click", (event) => {
    event.stopPropagation();
    if (glitchState === "thinking") {
      setGlitchState("dormant");
      return;
    }
    if (currentGlitchExplanation()) {
      setGlitchState("thinking");
      return;
    }
    setGlitchState("aware");
  });
  glitchEl.querySelector(".glitch-close").addEventListener("click", (event) => {
    event.stopPropagation();
    setGlitchState("dormant");
  });
  document.addEventListener("click", (event) => {
    if (glitchState === "thinking" && glitchEl && !glitchEl.contains(event.target)) {
      setGlitchState("dormant");
    }
  });
}

function setGlitchState(nextState) {
  glitchState = nextState;
  applyGlitchState();
}

function currentGlitchExplanation() {
  try {
    const step = currentLessonStep();
    if (state.screen !== "workspace" || !step) return "";
    const axis = getLessonAxis(step.validationMode);
    const tokens = GLITCH_TOKENS[step.validationMode];
    if (axis === "cause" && tokens) {
      return `This step is about what causes code to run.

The program does not run continuously.
It waits until something triggers it.

In this step, the trigger is:
${tokens.event}

The line:
${tokens.binding}

connects that trigger to a function.

When the trigger occurs, the function:
${tokens.fn}

runs.

This step does not change what the function does.
It changes when the function runs.`;
    }
    if (axis === "control" && tokens) {
      return `This step is about how the program chooses what to do.

The same input can lead to different behavior.
That choice depends on conditions.

The program checks:
${tokens.condition}

Only the code inside the matching condition runs.
Other paths are skipped.

This is how programs make decisions instead of running every line.`;
    }
    if (axis === "state") {
      return `This step is about what the system remembers.

The program stores a value so it can use it again.

That stored value becomes part of the system's current state.

When state changes, the next result can change too.`;
    }
    if (axis === "result") {
      return `This step is about seeing the signal.

The code runs, then something visible happens.

The important part is the connection between the line of code and the output on screen.

First, see the result. Later, you will control when and why it happens.`;
    }
    return "";
  } catch (error) {
    return "";
  }
}

function applyGlitchState() {
  if (!glitchEl) return;
  const visible = state.screen === "workspace";
  const explanation = glitchState === "thinking" ? currentGlitchExplanation() : "";
  glitchEl.className = [
    "glitch-entity",
    visible ? "glitch--visible" : "",
    state.settings.reducedMotion ? "glitch--reduced-motion" : "",
    `glitch--${glitchState}`
  ].filter(Boolean).join(" ");
  const slot = document.getElementById("glitch-slot");
  if (slot) slot.classList.toggle("glitch-slot--active", visible);
  const copy = glitchEl.querySelector(".glitch-bubble-copy");
  if (copy) copy.textContent = explanation;
  const face = glitchEl.querySelector(".glitch-face");
  if (face) {
    face.setAttribute("aria-expanded", glitchState === "thinking" ? "true" : "false");
    face.disabled = !visible;
  }
}

function updateGlitchPosition() {
  // position is now handled by CSS flex layout via #glitch-slot
}

function updateGlitch() {
  applyGlitchState();
  updateGlitchPosition();
}

function save() {
  localStorage.setItem("glitchWorksState", JSON.stringify({
    screen: state.screen,
    project: state.project,
    step: state.step,
    code: state.code,
    prediction: state.prediction,
    predictionAnswer: state.predictionAnswer,
    focus: state.focus,
    lineNumbers: state.lineNumbers,
    completed: state.completed,
    showConceptLock: state.showConceptLock,
    stepStatus: state.stepStatus,
    stepResults: state.stepResults,
    recentlyCompletedProject: state.recentlyCompletedProject,
    unlockedLevels: state.unlockedLevels,
    settings: state.settings
  }));
}

function setScreen(screen) {
  clearLensCaptionTimer();
  state.screen = VALID_SCREENS.has(screen) ? screen : "home";
  state.log = "Output waiting.";
  save();
  render();
  requestAnimationFrame(updateGlitch);
}

function setProject(id) {
  if (!VALID_PROJECTS.has(id)) id = "color";

  state.project = id;
  state.step = 0;
  loadStepCode();
  resetStepInteractionState();
  setScreen("brief");
}

function currentProject() {
  return projects[state.project];
}

function ignitionProjects() {
  return IGNITION_PROJECT_IDS.map(id => [id, projects[id]]);
}

function level1Projects() {
  return LEVEL1_PROJECT_IDS.map(id => [id, projects[id]]);
}

function currentLessonSteps() {
  return lessonData[state.project] || [];
}

function currentLessonStep() {
  return currentLessonSteps()[state.step];
}

function loadStepCode() {
  const step = currentLessonStep();
  if (step) state.code[state.project] = step.code;
}

function resetStepInteractionState() {
  const step = currentLessonStep();
  state.prediction = "";
  state.predictionAnswer = "";
  state.showConceptLock = false;
  state.log = "Output waiting.";
  state.stepStatus = {
    project: state.project,
    stepId: step ? step.id : null,
    ran: false,
    success: false,
    message: ""
  };
  state.outputResult = null;
}

function progressPercent() {
  const completedIgnition = IGNITION_PROJECT_IDS.filter(id => state.completed.includes(id)).length;
  return Math.round((completedIgnition / IGNITION_PROJECT_IDS.length) * 100);
}

function isIgnitionComplete() {
  return IGNITION_PROJECT_IDS.every(id => state.completed.includes(id));
}

function isLevel1Complete() {
  return LEVEL1_PROJECT_IDS.every(id => state.completed.includes(id));
}

function isLevelUnlocked(levelId) {
  return !!state.unlockedLevels[levelId];
}

function unlockLevel(levelId) {
  if (levelId !== "level1") return;
  state.unlockedLevels.level1 = true;
  state.reward = {
    visible: true,
    type: "node-unlock",
    message: "Level 1 preview unlocked.",
    project: null,
    stepId: null
  };
  if (!state.settings.reducedMotion) {
    if (rewardTimer) clearTimeout(rewardTimer);
    rewardTimer = window.setTimeout(() => { hideReward(); rewardTimer = null; }, 1500);
  }
  save();
  setScreen("level1Intro");
}

function applySettings() {
  document.body.style.setProperty("--font-scale", state.settings.font);
  document.body.classList.toggle("reduced-motion", !!state.settings.reducedMotion);
  document.body.classList.toggle("high-contrast", !!state.settings.highContrast);
}

function navButton(id, label) {
  return `
    <button
      type="button"
      class="${state.screen === id ? "active" : ""}"
      onclick="setScreen('${escapeJsString(id)}')"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

function topbar() {
  const nav = [
    ["home", "Preview"],
    ["hub", "Ignition"],
    ["map", "Snake Map"],
    ["dashboard", "Dashboard"],
    ["settings", "Settings"]
  ];
  return `
    <header class="topbar">
      <div class="brand">
        <button type="button" class="mark" title="Glitch Works home" onclick="setScreen('home')">GW</button>
        <div>
          <strong>Glitch Works</strong>
          <span>ADHD as a feature, not a bug.</span>
        </div>
      </div>
      <nav class="nav" aria-label="Primary navigation">
        ${nav.map(([id, label]) => navButton(id, label)).join("")}
      </nav>
      <div class="top-actions">
        <div
          class="progress-orbit"
          style="--value:${progressPercent() * 3.6}deg"
          role="img"
          aria-label="${progressPercent()} percent of free Ignition complete"
        >
          <span>${progressPercent()}%</span>
        </div>
        <button type="button" class="icon-button ${state.focus ? "active" : ""}" title="Toggle Focus Mode" onclick="toggleFocus()">Focus</button>
      </div>
    </header>
  `;
}

function render() {
  applySettings();
  const screens = {
    home,
    hub,
    brief,
    workspace,
    complete,
    ignitionComplete,
    level1Intro,
    paywall,
    map,
    dashboard,
    settings
  };
  const hideTopbar = state.focus && state.screen === "workspace";
  app.innerHTML = (hideTopbar ? "" : topbar()) + rewardToast() + screens[state.screen]() + snakeLensSidebar();
  bindAfterRender();
}

function bindAfterRender() {
  const canvas = document.querySelector("#snakeCanvas");
  if (canvas) drawSnake(canvas);
  const editor = document.querySelector("#codeEditor");
  if (editor) updateLineNumbers(editor.value);
  initSnakeLens();
}

function home() {
  return `
    <main class="screen hero">
      <section>
        <p class="eyebrow">Destination: Snake</p>
        <h1>Not broken. Different runtime.</h1>
        <p class="lead">Glitch Works teaches coding one visual chunk at a time, built for focus-challenged brains that need to see the destination first.</p>
        <div class="cta-row">
          <button class="primary" onclick="setScreen('hub')">Start Ignition</button>
          <button class="secondary" onclick="setScreen('map')">Preview Snake Path</button>
        </div>
        <div class="trust-row">
          <span class="pill">No shame loops</span>
          <span class="pill">No giant files</span>
          <span class="pill">Adult tone</span>
          <span class="pill">Run first, name later</span>
        </div>
      </section>
      <section class="snake-stage" aria-label="Animated Snake preview">
        <p class="sr-only">
          Animated Snake preview showing the final project destination.
          The Snake path is made of input, random apple placement, screen updates, and game loop systems.
        </p>
        <canvas id="snakeCanvas" class="snake-canvas" width="640" height="360"></canvas>
        <div class="system-strip">
          ${systemChip("Input", "Reaction Timer", state.completed.includes("reaction"))}
          ${systemChip("Random apple", "Dice Roller", state.completed.includes("dice"))}
          ${systemChip("Screen updates", "Color Flasher", state.completed.includes("color"))}
          ${systemChip("Game loop", "Locked path", false)}
        </div>
      </section>
    </main>
  `;
}

function systemChip(name, source, unlocked) {
  return `<div class="system-chip ${unlocked ? "unlocked" : ""}"><strong>${escapeHtml(name)}</strong><small>${unlocked ? "Signal locked" : escapeHtml(source)}</small></div>`;
}

function hub() {
  const completedIgnition = IGNITION_PROJECT_IDS.filter(id => state.completed.includes(id)).length;
  return `
    <main class="screen">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Free Ignition Layer</p>
          <h2>Pick your ignition point.</h2>
          <p class="lead">Same concepts. Different dopamine. All three projects are free.</p>
        </div>
        ${completedIgnition ? `<button type="button" class="secondary" onclick="setScreen('${completedIgnition === IGNITION_PROJECT_IDS.length ? "ignitionComplete" : "dashboard"}')">Resume Path</button>` : ""}
      </div>
      <div class="grid">
        ${ignitionProjects().map(([id, project]) => projectCard(id, project)).join("")}
      </div>
    </main>
  `;
}

function projectCard(id, project) {
  const done = state.completed.includes(id);
  return card(`
    <div class="visual-tile">${projectVisual(id)}</div>
    <div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.brief)}</p>
    </div>
    <div>
      ${conceptChips(project.concepts)}
      <p>${escapeHtml(project.time)}</p>
      <p class="status">${done ? "Signal locked." : "Free"}</p>
    </div>
    ${button({
      label: done ? "Review Project" : "Start Project",
      className: done ? "secondary" : "primary",
      onClick: `setProject('${escapeJsString(id)}')`
    })}
  `, "card project-card");
}

function projectVisual(id) {
  if (id === "color") return `<div class="color-swatch"></div>`;
  if (id === "dice") return `<div class="die-face">${Array.from({ length: 9 }, (_, i) => [0, 2, 4, 6, 8].includes(i) ? "<i></i>" : "<span></span>").join("")}</div>`;
  if (id === "clicker") return `<div class="counter-output"><strong class="counter-score">Score: 1</strong></div>`;
  if (id === "rps") return `<div class="rps-output"><div class="rps-row"><span>rock</span><span>scissors</span></div><strong class="rps-result">player wins</strong></div>`;
  return `<div class="reaction-flash"></div>`;
}

function brief() {
  const project = currentProject();
  return `
    <main class="screen completion">
      <section class="panel">
        <p class="eyebrow">Build: ${escapeHtml(project.title)}</p>
        <h2>${escapeHtml(project.brief)}</h2>
        <p class="lead">You will learn how data is stored, how a click triggers code, and how the screen changes when the program responds.</p>
        <ul class="win-list">
          ${project.concepts.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
        </ul>
        <div class="cta-row">
          <button class="primary" onclick="setScreen('workspace')">Open Workspace</button>
          <button class="secondary" onclick="setScreen('hub')">Back to Ignition</button>
        </div>
      </section>
      <section class="panel">
        <h3>Final Output</h3>
        <div class="output-visual">${outputMarkup(state.project)}</div>
        <p>${escapeHtml(project.snakeUse)}</p>
      </section>
    </main>
  `;
}

function workspaceHeader(project, step) {
  return `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${escapeHtml(project.title)} / ${escapeHtml(step.stepLabel)}</p>
        <h2>${escapeHtml(step.title)}</h2>
      </div>
      <div class="cta-row">
        ${state.focus ? `<button type="button" class="secondary" onclick="toggleFocus()">Exit Focus</button>` : ""}
        <button type="button" class="secondary" onclick="setScreen('hub')">Exit Workspace</button>
      </div>
    </div>
  `;
}

function workspaceInstructionPanel(step) {
  return `
    <aside class="panel side-panel">
      <h3>Current Goal</h3>
      <p>${highlightTerms(step.goal, step.focusTerms || [])}</p>
      <p>${highlightTerms(step.instruction, step.focusTerms || [])}</p>
      <h3>Concept Reminder</h3>
      <p>${highlightTerms(step.conceptLock, step.focusTerms || [])}</p>
      ${lessonStepper()}
    </aside>
  `;
}

function workspaceEditorPanel(code, step) {
  return `
    <section class="panel">
      <div class="editor-toolbar">
        <strong>Code Chunk</strong>
        <div>
          <button type="button" class="ghost" onclick="toggleLineNumbers()">${state.lineNumbers ? "Hide Lines" : "Show Lines"}</button>
          <button type="button" class="ghost" onclick="resetChunk()">Reset</button>
        </div>
      </div>
      <div class="code-wrap">
        <pre id="lineNumbers" class="line-numbers" ${state.lineNumbers ? "" : "hidden"}></pre>
        <textarea id="codeEditor" class="code-editor" spellcheck="false" oninput="updateCode(this.value)">${escapeHtml(code)}</textarea>
      </div>
      ${codeMap(code, step.focusTerms || [])}
      ${step.prediction ? predictionPrompt() : ""}
      ${predictionFeedbackPanel()}
      <div class="workspace-actions">
        <button type="button" class="secondary" onclick="showHint()">Hint</button>
        <div class="cta-row">
          <button type="button" class="secondary" onclick="previousStep()">Back</button>
          ${button({
            label: "Run",
            className: `primary run-button${didCurrentStepJustSucceed() ? " run-success" : ""}`,
            onClick: "runChunk()"
          })}
          <button type="button" class="primary" onclick="nextStep()">Next</button>
          ${isCurrentStepOptional() ? `<button type="button" class="secondary" onclick="skipOptionalStep()">Skip Bonus</button>` : ""}
        </div>
      </div>
    </section>
  `;
}

function workspaceOutputPanel() {
  return `
    <aside class="panel output-panel">
      <h3>Visual Output</h3>
      <div id="outputVisual" class="output-visual">${outputMarkup(state.project)}</div>
      ${outputTrace()}
      ${runLog()}
      ${conceptLockPanel()}
    </aside>
  `;
}

function workspace() {
  const project = currentProject();
  const step = currentLessonStep();
  const code = state.code[state.project] || step.code;
  return `
    <main class="screen">
      ${workspaceHeader(project, step)}
      <section class="workspace ${state.focus ? "focus" : ""}">
        ${workspaceInstructionPanel(step)}
        ${workspaceEditorPanel(code, step)}
        ${workspaceOutputPanel()}
      </section>
    </main>
  `;
}

function predictionPrompt() {
  const step = currentLessonStep();
  if (!step || !step.prediction) return "";
  if (step.prediction.type === "choice") {
    return predictionChoicePrompt(step);
  }
  return predictionTextPrompt(step);
}

function predictionTextPrompt(step) {
  return `
    <div class="prediction">
      <label for="predictionInput">
        <strong>Before you run it:</strong> ${escapeHtml(step.prediction.prompt)}
      </label>
      <input
        id="predictionInput"
        value="${escapeHtml(state.predictionAnswer || "")}"
        oninput="setPredictionText(this.value)"
        placeholder="I think..."
      />
    </div>
  `;
}

function predictionChoiceButton(option) {
  const selected = state.predictionAnswer === option;
  return `
    <button
      type="button"
      class="prediction-choice${selected ? " selected" : ""}"
      aria-pressed="${selected ? "true" : "false"}"
      onclick="setPredictionAnswer('${escapeJsString(option)}')"
    >
      ${escapeHtml(option)}
    </button>
  `;
}

function predictionChoicePrompt(step) {
  return `
    <div class="prediction">
      <p><strong>Before you run it:</strong> ${escapeHtml(step.prediction.prompt)}</p>
      <div class="prediction-choices">
        ${step.prediction.options.map(predictionChoiceButton).join("")}
      </div>
    </div>
  `;
}

function setPredictionAnswer(value) {
  state.predictionAnswer = value;
  state.prediction = value;
  save();
  render();
}

function setPredictionText(value) {
  state.predictionAnswer = value;
  state.prediction = value;
  save();
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function escapeJsString(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replaceAll("\n", "\\n");
}

function normalizePredictionValue(value) {
  return String(value ?? "").trim().toLowerCase();
}

function predictionMatched(step) {
  if (!step || !step.prediction) return false;
  return normalizePredictionValue(state.predictionAnswer) === normalizePredictionValue(step.prediction.expected);
}

function predictionFeedbackMessage(step) {
  if (!step || !step.prediction) return "";

  const selected = state.predictionAnswer || "";
  const expected = step.prediction.expected || "";

  if (!selected) {
    return "Prediction skipped. Make a prediction first, then run the chunk. The prediction is not graded.";
  }

  if (normalizePredictionValue(selected) === "not sure") {
    return `Not sure is allowed. The signal to watch is: ${expected}.`;
  }

  if (step.prediction.feedback && step.prediction.feedback[selected]) {
    return step.prediction.feedback[selected];
  }

  if (predictionMatched(step)) {
    return step.prediction.matchFeedback || `Prediction matched. The actual signal was: ${expected}.`;
  }

  return step.prediction.missFeedback || `Prediction differed. The actual signal was: ${expected}.`;
}

function predictionFeedbackPanel() {
  const step = currentLessonStep();

  if (!step || !step.prediction || !state.stepStatus.ran) {
    return "";
  }

  const selected = state.predictionAnswer || "No prediction selected";
  const expected = step.prediction.expected || "No expected signal";
  const matched = predictionMatched(step);
  const message = predictionFeedbackMessage(step);
  const statusLabel = !state.predictionAnswer
    ? "Prediction skipped"
    : matched
      ? "Prediction matched"
      : normalizePredictionValue(state.predictionAnswer) === "not sure"
        ? "Not sure is allowed"
        : "Prediction differed";
  const statusClass = !state.predictionAnswer
    ? "skipped"
    : matched
      ? "matched"
      : normalizePredictionValue(state.predictionAnswer) === "not sure"
        ? "unsure"
        : "differed";

  return `
    <div class="prediction-feedback ${statusClass}" role="status" aria-live="polite">
      <p class="eyebrow">Prediction check</p>
      <h3>${escapeHtml(statusLabel)}</h3>
      <p><strong>You picked:</strong> ${escapeHtml(selected)}</p>
      <p><strong>Actual signal:</strong> ${escapeHtml(expected)}</p>
      <p><strong>Why:</strong> ${escapeHtml(message)}</p>
    </div>
  `;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termPattern(term) {
  const escaped = escapeRegExp(term);
  const isIdentifier = /^[A-Za-z_][A-Za-z0-9_]*$/.test(term);
  const isEqualsOperator = /^=+$/.test(term);
  if (isIdentifier) {
    return new RegExp(`(?<![A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`, "g");
  }
  if (isEqualsOperator) {
    return new RegExp(`(?<!=)${escaped}(?!=)`, "g");
  }
  return new RegExp(escaped, "g");
}

function highlightTerms(text, terms = []) {
  let output = escapeHtml(text);
  const sortedTerms = [...terms].sort((a, b) => String(b.term).length - String(a.term).length);

  sortedTerms.forEach(({ term, type }) => {
    if (!term) return;
    const escapedTerm = escapeHtml(term);
    const safeType = escapeAttribute(type || "variable");
    const pattern = termPattern(escapedTerm);
    output = output.replace(
      pattern,
      `<span class="term-highlight term-${safeType}" aria-label="${safeType}: ${escapeAttribute(term)}">${escapedTerm}</span>`
    );
  });

  return output;
}

function codeMap(code, terms = []) {
  if (!code) return "";

  return `
    <div class="code-map" role="region" aria-label="Highlighted code map">
      <div class="code-map-label">Signal Map</div>
      <pre>${highlightTerms(code, terms)}</pre>
    </div>
  `;
}

function highlightedCodeBlock(label, code, terms = []) {
  if (!code) return "";

  return `
    <div class="lens-code-block">
      <div class="code-map-label">${escapeHtml(label)}</div>
      <pre>${highlightTerms(code, terms)}</pre>
    </div>
  `;
}

function renderLensCode(snippet, highlightLine) {
  return String(snippet || "")
    .split("\n")
    .map(line => {
      const escaped = escapeHtml(line);
      if (line.trim() === String(highlightLine || "").trim()) {
        return `<mark>${escaped}</mark>`;
      }
      return escaped;
    })
    .join("\n");
}

function outputTrace() {
  const trace = state.outputResult?.trace;

  if (!trace) return "";
  const rows = Array.isArray(trace)
    ? trace.map((item, index) => ({
      label: ["Input / Trigger", "Rule / Logic", "Result", "Why it matters"][index] || "Trace",
      value: item
    }))
    : [
      { label: trace.trigger ? "Trigger" : "Input / Trigger", value: trace.trigger || trace.input },
      { label: "Rule / Logic", value: trace.logic },
      { label: "Result", value: trace.result },
      { label: "Why it matters", value: trace.why }
    ];
  const visibleRows = rows.filter(row => row.value);

  if (!visibleRows.length) return "";

  return `
    <div class="output-trace" aria-label="Code output trace">
      <p class="eyebrow">Trace</p>
      <ul>
        ${visibleRows.map(row => `
          <li>
            <strong>${escapeHtml(row.label)}</strong>
            <span>${highlightTerms(row.value, currentLessonStep()?.focusTerms || [])}</span>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function applyAxisTrace(step) {
  const axis = getLessonAxis(step?.validationMode);
  const trace = AXIS_TRACE_BY_MODE[step?.validationMode];
  if ((axis !== "cause" && axis !== "control") || !trace || !state.outputResult) {
    return;
  }
  state.outputResult = {
    ...state.outputResult,
    trace
  };
}

function button({ label, className = "secondary", onClick = "", disabled = false, title = "" }) {
  return `
    <button
      type="button"
      class="${escapeAttribute(className)}"
      ${title ? `title="${escapeAttribute(title)}"` : ""}
      ${disabled ? "disabled" : ""}
      onclick="${escapeAttribute(onClick)}"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

function panel(content, className = "panel") {
  return `
    <section class="${escapeAttribute(className)}">
      ${content}
    </section>
  `;
}

function card(content, className = "card") {
  return `
    <article class="${escapeAttribute(className)}">
      ${content}
    </article>
  `;
}

function conceptChips(concepts = []) {
  return `
    <div class="concepts">
      ${concepts.map(concept => `<span>${escapeHtml(concept)}</span>`).join("")}
    </div>
  `;
}

function winList(items = []) {
  return `
    <ul class="win-list">
      ${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function pills(items = []) {
  return `
    <div class="trust-row">
      ${items.map(item => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
    </div>
  `;
}

function lessonStepPill(step, index) {
  const active = index === state.step;
  const complete = !!state.stepResults[state.project]?.[step.id];
  return `
    <div
      class="step-pill ${active ? "active" : ""} ${complete ? "complete" : ""}"
      ${active ? `aria-current="step"` : ""}
    >
      <span class="step-dot"></span>
      ${escapeHtml(step.title)}
    </div>
  `;
}

function lessonStepper() {
  return `
    <div class="stepper">
      ${currentLessonSteps().map(lessonStepPill).join("")}
    </div>
  `;
}

function runLog() {
  const statusClass = state.stepStatus.success
    ? "success"
    : state.stepStatus.ran
    ? "debug"
    : "";
  return `
    <div class="run-log ${statusClass}" id="runLog" role="status" aria-live="polite">
      ${escapeHtml(state.log)}
    </div>
  `;
}

function conceptLockPanel() {
  const step = currentLessonStep();
  if (!state.showConceptLock || !state.stepStatus.success || !step) {
    return "";
  }
  return `
    <div class="concept-lock">
      <p class="eyebrow">Concept locked</p>
      <h3>${escapeHtml(step.conceptName || "System")}</h3>
      <p>${escapeHtml(step.conceptLock || "This chunk is working.")}</p>
      ${step.snakeConnection ? `
        <div class="snake-link">
          <strong>Snake connection</strong>
          <p>${escapeHtml(step.snakeConnection)}</p>
        </div>
      ` : ""}
    </div>
  `;
}

function systemCapabilityPanel(step) {
  const category = SYSTEM_CAPABILITY_BY_MODE[step?.validationMode];
  const capability = SYSTEM_CAPABILITIES[category];
  if (!capability) {
    return "";
  }

  return `
    <div class="system-capability">
      <p class="system-capability-label">System capability</p>
      <h3>${escapeHtml(capability.title)}</h3>
      <p>${escapeHtml(capability.description)}</p>
    </div>
  `;
}

function snakeLensSidebar() {
  const step = currentLessonStep();
  const lens = step?.snakeLens;
  if (!state.stepStatus.success || !lens) {
    return "";
  }
  const axis = getLessonAxis(step.validationMode);
  const axisClass = axis === "cause" ? "lens--cause" : axis === "control" ? "lens--control" : "";
  const axisLabel = axis === "cause" ? "TRIGGER → RESPONSE" : axis === "control" ? "IF → THEN / ELSE" : "";
  const demoType = lens.demoType || "redraw";
  const caption = SNAKE_LENS_CAPTIONS[demoType] || "This is the exact moment your code runs in Snake.";
  const phaseOneCaption = LENS_AXIS_CAPTIONS[step.validationMode];
  const elapsedCaptionTime = lensCaptionMode === step.validationMode ? Date.now() - lensCaptionStartedAt : 0;
  const shownCaption = phaseOneCaption && !state.settings.reducedMotion && elapsedCaptionTime < 2800 ? phaseOneCaption : caption;

  return `
    <div class="snake-lens-sidebar ${axisClass}" role="region" aria-label="Game system">
      <p class="eyebrow">Game System — ${escapeHtml(lens.systemName)}</p>
      <div class="snake-lens-split">
        <div class="lens-code">
          <p class="lens-code-label">Inside Snake</p>
          <pre>${renderLensCode(lens.snakeSnippet, lens.highlightLine)}</pre>
        </div>
        <div class="lens-demo snake-lens-demo">
          <div class="lens-snake-grid" id="lens-snake-grid" data-demo-type="${escapeAttribute(demoType)}"></div>
          ${demoType === "score" ? `<div class="lens-score-counter" aria-label="Mini Snake score">Score: <span>0</span></div>` : ""}
          ${axisLabel ? `<div class="lens-axis-label">${escapeHtml(axisLabel)}</div>` : ""}
          <p class="lens-caption" data-phase-two-caption="${escapeAttribute(caption)}" data-has-caption-cycle="${phaseOneCaption && !state.settings.reducedMotion ? "true" : "false"}">${escapeHtml(shownCaption)}</p>
        </div>
      </div>
      <p class="lens-explanation">${escapeHtml(lens.explanation)}</p>
      ${systemCapabilityPanel(step)}
    </div>
  `;
}

function initSnakeLens() {
  if (window._snakeDemoInterval) {
    clearInterval(window._snakeDemoInterval);
    window._snakeDemoInterval = null;
  }
  clearLensCaptionTimer(false);
  const grid = document.querySelector(".lens-snake-grid");
  if (!grid) return;
  startSnakeDemo(grid, grid.dataset.demoType || "redraw");
  const caption = document.querySelector(".lens-caption[data-has-caption-cycle='true']");
  if (caption) {
    const mode = currentLessonStep()?.validationMode;
    if (lensCaptionMode !== mode) {
      lensCaptionMode = mode;
      lensCaptionStartedAt = Date.now();
    }
    const remaining = Math.max(0, 2800 - (Date.now() - lensCaptionStartedAt));
    lensCaptionTimer = window.setTimeout(() => {
      caption.textContent = caption.dataset.phaseTwoCaption || caption.textContent;
      lensCaptionTimer = null;
    }, remaining);
  }
}

function clearLensCaptionTimer(reset = true) {
  if (lensCaptionTimer) {
    clearTimeout(lensCaptionTimer);
    lensCaptionTimer = null;
  }
  if (reset) {
    lensCaptionMode = null;
    lensCaptionStartedAt = 0;
  }
}

function startSnakeDemo(container, demoType) {
  const cells = Array.from({ length: 64 }, () => {
    const cell = document.createElement("div");
    container.appendChild(cell);
    return cell;
  });
  const index = (x, y) => y * 8 + x;
  const clear = () => {
    cells.forEach(cell => {
      cell.className = "";
      cell.textContent = "";
    });
  };
  const paintSnake = parts => {
    parts.forEach(([x, y], partIndex) => {
      const cell = cells[index(x, y)];
      if (cell) cell.className = partIndex === 0 ? "snake head" : "snake";
    });
  };
  const paintApple = ([x, y], className = "apple") => {
    const cell = cells[index(x, y)];
    if (cell) cell.className = className;
  };

  if (demoType === "random") {
    let tick = 0;
    const randomTiles = [[1, 1], [6, 2], [3, 5], [5, 6], [2, 3]];
    const draw = () => {
      clear();
      paintApple(randomTiles[tick % randomTiles.length]);
      tick += 1;
    };
    draw();
    window._snakeDemoInterval = setInterval(draw, 1200);
    return;
  }

  if (demoType === "timing") {
    let headX = 2;
    let pause = false;
    const draw = () => {
      clear();
      paintSnake([[headX, 3], [Math.max(0, headX - 1), 3], [Math.max(0, headX - 2), 3]]);
      if (!pause) headX = headX >= 6 ? 2 : headX + 1;
      pause = !pause;
    };
    draw();
    window._snakeDemoInterval = setInterval(draw, 600);
    return;
  }

  if (demoType === "score") {
    let step = 0;
    const scoreTarget = container.parentElement?.querySelector(".lens-score-counter span");
    const draw = () => {
      clear();
      const ate = step >= 1;
      paintSnake(ate ? [[4, 3], [3, 3]] : [[3, 3], [2, 3]]);
      if (!ate) paintApple([4, 3]);
      if (scoreTarget) scoreTarget.textContent = ate ? "1" : "0";
      step = (step + 1) % 4;
    };
    draw();
    window._snakeDemoInterval = setInterval(draw, 650);
    return;
  }

  if (demoType === "condition") {
    let step = 0;
    const frames = [
      { snake: [[2, 3]], apple: [4, 3] },
      { snake: [[3, 3]], apple: [4, 3] },
      { snake: [[4, 3]], flashGreen: [4, 3] },
      { snake: [[5, 3]], wall: [7, 3] },
      { snake: [[6, 3]], wall: [7, 3] },
      { snake: [[7, 3]], flashRed: [7, 3] }
    ];
    const draw = () => {
      clear();
      const frame = frames[step % frames.length];
      if (frame.apple) paintApple(frame.apple);
      if (frame.wall) paintApple(frame.wall, "wall");
      if (frame.flashGreen) paintApple(frame.flashGreen, "flash-green");
      if (frame.flashRed) paintApple(frame.flashRed, "flash-red");
      paintSnake(frame.snake);
      step += 1;
    };
    draw();
    window._snakeDemoInterval = setInterval(draw, 520);
    return;
  }

  let headX = 2;
  const draw = () => {
    clear();
    paintSnake([[headX, 3], [(headX + 7) % 8, 3], [(headX + 6) % 8, 3]]);
    headX = (headX + 1) % 8;
  };
  draw();
  window._snakeDemoInterval = setInterval(draw, 400);
}

function rewardToast() {
  if (!state.reward.visible) return "";
  if (!state.reward.message) return "";
  return `
    <div class="reward-toast ${escapeAttribute(state.reward.type)}" role="status" aria-live="polite">
      <span class="reward-prefix">${state.reward.type === "project-complete" ? "SHIPPED" : "SIGNAL"}</span>
      <span>${escapeHtml(state.reward.message)}</span>
      ${state.settings.reducedMotion ? button({
        label: "Dismiss",
        className: "secondary reward-dismiss",
        onClick: "hideReward()"
      }) : ""}
    </div>
  `;
}

function isCurrentStepOptional() {
  const step = currentLessonStep();
  return !!step && !!step.optional;
}

function skipOptionalStep() {
  const step = currentLessonStep();
  if (!step || !step.optional) return;
  completeProject();
}

function outputMarkup(id) {
  const r = state.outputResult;
  if (id === "color") {
    const hex = (r?.project === "color" && r.colorName && supportedColors[r.colorName])
      ? supportedColors[r.colorName]
      : "";
    return `<div class="mini-output flash-output"${hex ? ` style="--flash: ${hex}"` : ""}></div>`;
  }
  if (id === "dice") {
    if (r?.project === "dice" && r.roll) {
      const pips = dicePips(r.roll);
      return `
        <div class="dice-output">
          <div class="die-face">
            ${Array.from({ length: 9 }, (_, i) => pips.includes(i) ? "<i></i>" : "<span></span>").join("")}
          </div>
          <strong>You rolled ${r.roll}</strong>
        </div>
      `;
    }
    return `
      <div class="dice-output">
        <div class="die-face">
          ${Array.from({ length: 9 }, (_, i) => [0, 2, 4, 6, 8].includes(i) ? "<i></i>" : "<span></span>").join("")}
        </div>
        <strong>Ready to roll</strong>
      </div>
    `;
  }
  if (id === "clicker") {
    const score = (r?.project === "clicker" && Number.isFinite(Number(r.score))) ? Number(r.score) : 0;
    return `<div class="counter-output"><span>Score</span><strong class="counter-score">${score}</strong></div>`;
  }
  if (id === "rps") {
    const player = (r?.project === "rps" && r.player) ? r.player : "Choose your move";
    const computer = (r?.project === "rps" && r.computer) ? r.computer : "Waiting";
    const result = (r?.project === "rps" && r.result) ? r.result : "Choose your move";
    return `
      <div class="rps-output">
        <div class="rps-row">
          <span>Player: ${escapeHtml(player)}</span>
          <span>Computer: ${escapeHtml(computer)}</span>
        </div>
        <strong class="rps-result">${escapeHtml(result)}</strong>
      </div>
    `;
  }
  const bg = (r?.project === "reaction" && r.bg) ? r.bg : "";
  const label = (r?.project === "reaction" && r.label) ? r.label : "Wait for flash";
  return `<div class="reaction-output"${bg ? ` style="--reaction-bg: ${bg}"` : ""}><button type="button" class="reaction-target" onclick="reactionClick()">${escapeHtml(label)}</button></div>`;
}

function updateCode(value) {
  state.code[state.project] = value;
  updateLineNumbers(value);
  save();
}

function updateLineNumbers(value) {
  const lines = value.split("\n").length;
  const target = document.querySelector("#lineNumbers");
  if (target) target.textContent = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
}

function runChunk() {
  const step = currentLessonStep();
  const result = validateCurrentStep();
  if (!result.ok) {
    state.stepStatus = {
      project: state.project,
      stepId: step ? step.id : null,
      ran: true,
      success: false,
      message: result.message
    };
    state.reward = {
      visible: false,
      type: "",
      message: "",
      project: null,
      stepId: null
    };
    state.lastSuccessfulRun = {
      project: null,
      stepId: null
    };
    if (rewardTimer) {
      clearTimeout(rewardTimer);
      rewardTimer = null;
    }
    state.showConceptLock = false;
    state.log = result.message;
    updateLog();
    save();
    render();
    return;
  }
  if (state.project === "color") runColorForStep(step, result);
  if (state.project === "dice") runDiceForStep(step, result);
  if (state.project === "reaction") runReactionForStep(step, result);
  if (state.project === "clicker") runClickerForStep(step, result);
  if (state.project === "rps") runRpsForStep(step, result);
  applyAxisTrace(step);
  const message = result.message || step.runSuccess || "Output confirmed.";
  state.stepStatus = {
    project: state.project,
    stepId: step.id,
    ran: true,
    success: true,
    message
  };
  state.lastSuccessfulRun = {
    project: state.project,
    stepId: step.id
  };
  state.showConceptLock = true;
  state.log = message;
  const firstSuccess = isFirstStepSuccess(step);
  markStepSuccess(step);
  if (firstSuccess) {
    state.reward = {
      visible: true,
      type: "step-success",
      message: "Output confirmed.",
      project: state.project,
      stepId: step.id
    };
    if (!state.settings.reducedMotion) {
      if (rewardTimer) clearTimeout(rewardTimer);
      rewardTimer = window.setTimeout(() => { hideReward(); rewardTimer = null; }, 1500);
    }
  }
  updateLog();
  save();
  render();
}

function runDice() {
  const roll = rollDie();
  const pips = dicePips(roll);
  const visual = document.querySelector("#outputVisual");
  if (visual) {
    visual.innerHTML = `<div class="dice-output"><div class="die-face">${Array.from({ length: 9 }, (_, i) => pips.includes(i) ? "<i></i>" : "<span></span>").join("")}</div><strong>You rolled ${roll}</strong></div>`;
  }
  state.log = `Chunk compiled.\nroll = ${roll}`;
  updateLog();
}

function dicePips(roll) {
  return {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  }[roll];
}

function normalizeCode(code) {
  return String(code)
    .replace(/\r\n/g, "\n")
    .trim();
}

function stripComments(code) {
  return normalizeCode(code)
    .split("\n")
    .map(line => line.replace(/#.*$/, ""))
    .filter(line => line.trim())
    .join("\n")
    .trim();
}

function hasUnquotedAssignment(code, variableName, allowedValues) {
  const pattern = new RegExp(`${variableName}\\s*=\\s*(${allowedValues.join("|")})\\b`, "i");
  return code.match(pattern);
}

function getStringAssignment(code, variableName) {
  const pattern = new RegExp(`${variableName}\\s*=\\s*["']([^"']+)["']`, "i");
  const match = code.match(pattern);
  return match ? match[1] : null;
}

function containsCall(code, callText) {
  return normalizeCode(code).includes(callText);
}

function containsFunctionDef(code, functionName) {
  const pattern = new RegExp(`def\\s+${functionName}\\s*\\(\\s*\\)\\s*:`, "i");
  return pattern.test(code);
}

function hasIndentedBodyAfterDef(code, functionName) {
  const lines = normalizeCode(code).split("\n");
  const defIndex = lines.findIndex(line =>
    new RegExp(`^def\\s+${functionName}\\s*\\(\\s*\\)\\s*:`, "i").test(line.trim())
  );
  if (defIndex === -1) return false;
  return lines.slice(defIndex + 1).some(line => /^\s+\S/.test(line));
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function validateColorShow(code, step) {
  const clean = stripComments(code);
  const match = clean.match(/show\s*\(\s*["'](teal|purple|orange|green)["']\s*\)/i);
  if (!match) {
    return {
      ok: false,
      message: `Your code ran into something.\nTry showing one supported color:\nshow("teal")`
    };
  }
  return { ok: true, colorName: match[1].toLowerCase(), message: step.runSuccess };
}

function validateColorAssignment(code, step) {
  code = stripComments(code);
  const missingQuotes = hasUnquotedAssignment(code, "color", ["teal", "purple", "orange", "green"]);
  if (missingQuotes) {
    return {
      ok: false,
      message: `Syntax issue - text values need quotes.\nTry:\ncolor = "${missingQuotes[1].toLowerCase()}"`
    };
  }
  const colorName = getStringAssignment(code, "color");
  if (!colorName) {
    return {
      ok: false,
      message: `Your code ran into something.\nAdd a color assignment:\ncolor = "teal"`
    };
  }
  if (!supportedColors[colorName.toLowerCase()]) {
    return {
      ok: false,
      message: `That runs, but "${colorName}" is not in this color set.\nTry one of these:\nteal, purple, orange, green`
    };
  }
  return {
    ok: true,
    colorName: colorName.toLowerCase(),
    message: `Output confirmed.\ncolor now stores "${colorName.toLowerCase()}".`
  };
}

function validateColorShowVariable(code, step) {
  code = stripComments(code);
  const assignmentResult = validateColorAssignment(code, step);
  if (!assignmentResult.ok) return assignmentResult;
  if (!/show\s*\(\s*color\s*\)/i.test(code)) {
    return {
      ok: false,
      message: `Almost.\nThe color is stored, but it is not shown yet.\nAdd:\nshow(color)`
    };
  }
  return { ok: true, colorName: assignmentResult.colorName, message: step.runSuccess };
}

function validateColorFinalAssignment(code, step) {
  code = stripComments(code);
  const assignments = [...code.matchAll(/color\s*=\s*["']([^"']+)["']/gi)];
  if (!assignments.length) {
    return {
      ok: false,
      message: `Your code ran into something.\nAdd at least one color assignment:\ncolor = "teal"`
    };
  }
  const finalColor = assignments[assignments.length - 1][1].toLowerCase();
  if (!supportedColors[finalColor]) {
    return {
      ok: false,
      message: `That runs, but "${finalColor}" is not in this color set.\nTry:\nteal, purple, orange, green`
    };
  }
  const showCalls = [...code.matchAll(/show\s*\(\s*color\s*\)/gi)];
  if (showCalls.length < 2) {
    return {
      ok: false,
      message: `Almost.\nThis step compares before and after.\nUse show(color) after each color assignment.`
    };
  }
  return {
    ok: true,
    colorName: finalColor,
    message: `Output confirmed.\nThe final stored color is "${finalColor}".`
  };
}

function validateFunctionCall(code, step) {
  code = stripComments(code);
  const project = state.project;
  const functionName =
    project === "color" ? "flash_color" :
    project === "dice" ? "roll_die" :
    null;
  if (!functionName) {
    return { ok: false, message: "Your code ran into something. No function name was found for this project." };
  }
  if (!containsFunctionDef(code, functionName)) {
    return {
      ok: false,
      message: `Function issue - ${functionName} is not defined yet.\nTry:\ndef ${functionName}():`
    };
  }
  if (!hasIndentedBodyAfterDef(code, functionName)) {
    return {
      ok: false,
      message: `Indentation issue after the function line.\nThe lines inside ${functionName} need to be indented.`
    };
  }
  if (!new RegExp(`${functionName}\\s*\\(\\s*\\)`, "i").test(code.split("\n").slice(1).join("\n"))) {
    return {
      ok: false,
      message: `Your function exists, but it never runs.\nAdd:\n${functionName}()`
    };
  }
  return { ok: true, message: step.runSuccess };
}

function validateButtonEvent(code, step) {
  code = stripComments(code);
  const project = state.project;
  const functionName =
    project === "color" ? "flash_color" :
    project === "dice" ? "roll_die" :
    project === "reaction" ? "check_reaction" :
    null;
  if (!functionName) {
    return { ok: false, message: "Your code ran into something. No event function was found." };
  }
  if (!containsFunctionDef(code, functionName)) {
    return { ok: false, message: `Function issue - ${functionName} is not defined yet.` };
  }
  if (new RegExp(`button\\.on_click\\s*\\(\\s*${functionName}\\s*\\(\\s*\\)\\s*\\)`, "i").test(code)) {
    return {
      ok: false,
      message: `Almost.\n${functionName}() runs right now.\n${functionName} tells the button what to run later.\nTry:\nbutton.on_click(${functionName})`
    };
  }
  if (!new RegExp(`button\\.on_click\\s*\\(\\s*${functionName}\\s*\\)`, "i").test(code)) {
    return {
      ok: false,
      message: `The function exists, but the button is not connected yet.\nAdd:\nbutton.on_click(${functionName})`
    };
  }
  return { ok: true, message: step.runSuccess };
}

function validateRandomColor(code, step) {
  code = stripComments(code);
  if (!/colors\s*=\s*\[[^\]]+\]/i.test(code)) {
    return {
      ok: false,
      message: `List issue - color options need to be stored in a list.\nTry:\ncolors = ["teal", "purple", "orange", "green"]`
    };
  }
  if (!/random_choice\s*\(\s*colors\s*\)/i.test(code)) {
    return {
      ok: false,
      message: `Almost.\nThe list exists, but the program is not choosing from it yet.\nTry:\ncolor = random_choice(colors)`
    };
  }
  if (!/show\s*\(\s*color\s*\)/i.test(code)) {
    return { ok: false, message: `The random color is picked, but not shown.\nAdd:\nshow(color)` };
  }
  const colorNames = Object.keys(supportedColors);
  const picked = colorNames[Math.floor(Math.random() * colorNames.length)];
  return {
    ok: true,
    colorName: picked,
    message: `Output confirmed.\nrandom_choice picked "${picked}".`
  };
}

function validateDiceRandomNumber(code, step) {
  code = stripComments(code);
  if (!/roll\s*=\s*random_number\s*\(\s*1\s*,\s*6\s*\)/i.test(code)) {
    return {
      ok: false,
      message: `Random number issue.\nUse:\nroll = random_number(1, 6)`
    };
  }
  if (!/show\s*\(\s*roll\s*\)/i.test(code)) {
    return { ok: false, message: `The roll is stored, but not shown yet.\nAdd:\nshow(roll)` };
  }
  const roll = rollDie();
  return { ok: true, roll, message: `Chunk compiled.\nroll = ${roll}` };
}

function validateDiceRollVariable(code, step) {
  code = stripComments(code);
  if (!/roll\s*=/i.test(code)) {
    return {
      ok: false,
      message: `Variable issue.\nThe die result needs to be stored in roll.\nTry:\nroll = random_number(1, 6)`
    };
  }
  return validateDiceRandomNumber(code, step);
}

function validateDiceMessage(code, step) {
  code = stripComments(code);
  if (!/roll\s*=\s*random_number\s*\(\s*1\s*,\s*6\s*\)/i.test(code)) {
    return { ok: false, message: `The roll needs to happen first.\nTry:\nroll = random_number(1, 6)` };
  }
  if (!/message\s*=\s*["']You rolled\s*["']\s*\+\s*roll/i.test(code)) {
    return { ok: false, message: `Message issue.\nBuild the message from text and the roll:\nmessage = "You rolled " + roll` };
  }
  if (!/show\s*\(\s*message\s*\)/i.test(code)) {
    return { ok: false, message: `The message exists, but it is not shown yet.\nAdd:\nshow(message)` };
  }
  const roll = rollDie();
  return { ok: true, roll, message: `Output confirmed.\nYou rolled ${roll}` };
}

function validateDiceVisual(code, step) {
  code = stripComments(code);
  if (!/roll\s*=\s*random_number\s*\(\s*1\s*,\s*6\s*\)/i.test(code)) {
    return { ok: false, message: `The dice face needs a roll value.\nTry:\nroll = random_number(1, 6)` };
  }
  if (!/show_dice\s*\(\s*roll\s*\)/i.test(code)) {
    return { ok: false, message: `The roll exists, but the dice face is not shown.\nTry:\nshow_dice(roll)` };
  }
  const roll = rollDie();
  return { ok: true, roll, message: `Output confirmed.\nroll controlled the dice face.` };
}

function validateDiceFunction(code, step) {
  code = stripComments(code);
  return validateFunctionCall(code, step);
}

function validateDiceButtonEvent(code, step) {
  code = stripComments(code);
  return validateButtonEvent(code, step);
}

function validateDiceRepeat(code, step) {
  code = stripComments(code);
  const buttonResult = validateButtonEvent(code, step);
  if (!buttonResult.ok) return buttonResult;
  const roll = rollDie();
  return { ok: true, roll, message: `Output confirmed.\nThe same code produced a new result: ${roll}.` };
}

function validateReactionFlash(code, step) {
  code = stripComments(code);
  if (!/wait\s*\(\s*\)/i.test(code)) {
    return { ok: false, message: `Timing issue.\nStart with:\nwait()` };
  }
  if (!/flash\s*\(\s*["']green["']\s*\)/i.test(code)) {
    return { ok: false, message: `Flash issue.\nAfter waiting, flash the screen:\nflash("green")` };
  }
  const lines = code.split("\n");
  const waitIndex = lines.findIndex(line => /wait\s*\(\s*\)/i.test(line));
  const flashIndex = lines.findIndex(line => /flash\s*\(\s*["']green["']\s*\)/i.test(line));
  if (waitIndex > flashIndex) {
    return { ok: false, message: `Order issue.\nwait() needs to happen before flash("green").` };
  }
  return { ok: true, reactionMode: "flash", message: step.runSuccess };
}

function validateReactionStartTime(code, step) {
  code = stripComments(code);
  if (!/start_time\s*=\s*now\s*\(\s*\)/i.test(code)) {
    return { ok: false, message: `Time issue.\nStore the start time:\nstart_time = now()` };
  }
  if (!/show\s*\(\s*["']green["']\s*\)/i.test(code)) {
    return { ok: false, message: `The time is stored, but the ready signal is not shown.\nAdd:\nshow("green")` };
  }
  return { ok: true, reactionMode: "ready", message: step.runSuccess };
}

function validateReactionMeasure(code, step) {
  code = stripComments(code);
  if (!/start_time\s*=\s*now\s*\(\s*\)/i.test(code)) {
    return { ok: false, message: `Start time is missing.\nAdd:\nstart_time = now()` };
  }
  if (!/reaction_time\s*=\s*now\s*\(\s*\)\s*-\s*start_time/i.test(code)) {
    return { ok: false, message: `Measurement issue.\nReaction time is now minus the start time:\nreaction_time = now() - start_time` };
  }
  if (!/show\s*\(\s*reaction_time\s*\)/i.test(code)) {
    return { ok: false, message: `The reaction time is calculated, but not shown.\nAdd:\nshow(reaction_time)` };
  }
  return { ok: true, reactionMode: "measure", message: step.runSuccess };
}

function validateReactionState(code, step) {
  code = stripComments(code);
  if (!/state\s*=\s*["']waiting["']/i.test(code)) {
    return { ok: false, message: `State issue.\nStart in the waiting state:\nstate = "waiting"` };
  }
  if (!/state\s*=\s*["']ready["']/i.test(code)) {
    return { ok: false, message: `State issue.\nAfter waiting, switch to ready:\nstate = "ready"` };
  }
  return { ok: true, reactionMode: "state", message: step.runSuccess };
}

function validateReactionConditional(code, step) {
  code = stripComments(code);
  if (!/if\s+state\s*==\s*["']waiting["']\s*:/i.test(code)) {
    return { ok: false, message: `Condition issue.\nCheck the waiting state:\nif state == "waiting":` };
  }
  if (!/show\s*\(\s*["']too early["']\s*\)/i.test(code)) {
    return { ok: false, message: `The waiting branch needs feedback.\nAdd:\nshow("too early")` };
  }
  if (!/if\s+state\s*==\s*["']ready["']\s*:/i.test(code)) {
    return { ok: false, message: `Condition issue.\nCheck the ready state:\nif state == "ready":` };
  }
  if (!/show\s*\(\s*["']clicked["']\s*\)/i.test(code)) {
    return { ok: false, message: `The ready branch needs feedback.\nAdd:\nshow("clicked")` };
  }
  return { ok: true, reactionMode: "conditional", message: step.runSuccess };
}

function validateReactionButtonEvent(code, step) {
  code = stripComments(code);
  return validateButtonEvent(code, step);
}

function validateReactionComplete(code, step) {
  code = stripComments(code);
  const requiredChecks = [
    { test: /state\s*=\s*["']waiting["']/i, message: `Start in the waiting state:\nstate = "waiting"` },
    { test: /wait\s*\(\s*\)/i, message: `The timer needs a wait step:\nwait()` },
    { test: /state\s*=\s*["']ready["']/i, message: `After waiting, switch to ready:\nstate = "ready"` },
    { test: /start_time\s*=\s*now\s*\(\s*\)/i, message: `Store the start time:\nstart_time = now()` },
    { test: /def\s+check_reaction\s*\(\s*\)\s*:/i, message: `Define the click response:\ndef check_reaction():` },
    { test: /reaction_time\s*=\s*now\s*\(\s*\)\s*-\s*start_time/i, message: `Measure the reaction time:\nreaction_time = now() - start_time` },
    { test: /button\.on_click\s*\(\s*check_reaction\s*\)/i, message: `Connect the click:\nbutton.on_click(check_reaction)` }
  ];
  for (const check of requiredChecks) {
    if (!check.test.test(code)) {
      return { ok: false, message: check.message };
    }
  }
  return { ok: true, reactionMode: "complete", message: step.runSuccess };
}

function getNumericAssignment(code, variableName) {
  const pattern = new RegExp(`${variableName}\\s*=\\s*(\\d+)`, "i");
  const match = code.match(pattern);
  return match ? Number(match[1]) : null;
}

function validateClickerShowScore(code, step) {
  code = stripComments(code);
  const score = getNumericAssignment(code, "score");
  if (score === null) {
    return { ok: false, message: `Score issue.\nStore a number first:\nscore = 0` };
  }
  if (!/show\s*\(\s*score\s*\)/i.test(code)) {
    return { ok: false, message: `The score is stored, but not shown yet.\nAdd:\nshow(score)` };
  }
  return { ok: true, score, message: `Output confirmed.\nScore shown: ${score}.` };
}

function validateClickerStoreScore(code, step) {
  code = stripComments(code);
  const score = getNumericAssignment(code, "score");
  if (score === null) {
    return { ok: false, message: `Variable issue.\nStore the score:\nscore = 0` };
  }
  return { ok: true, score, message: `State stored.\nscore starts at ${score}.` };
}

function hasScoreIncrement(code) {
  return /score\s*=\s*score\s*\+\s*1/i.test(code) || /score\s*\+=\s*1/i.test(code);
}

function validateClickerIncrement(code, step) {
  code = stripComments(code);
  if (!hasScoreIncrement(code)) {
    return { ok: false, message: `Increment issue.\nIncrease score by one:\nscore = score + 1` };
  }
  if (!/show\s*\(\s*score\s*\)/i.test(code)) {
    return { ok: false, message: `The score changes, but it is not shown yet.\nAdd:\nshow(score)` };
  }
  return { ok: true, score: 1, message: step.runSuccess };
}

function validateClickerFunction(code, step) {
  code = stripComments(code);
  if (!containsFunctionDef(code, "add_point")) {
    return { ok: false, message: `Function issue.\nDefine the action:\ndef add_point():` };
  }
  if (!hasIndentedBodyAfterDef(code, "add_point")) {
    return { ok: false, message: `Indentation issue.\nThe score update belongs inside add_point().` };
  }
  if (!/add_point\s*\(\s*\)/i.test(code.split("\n").slice(1).join("\n"))) {
    return { ok: false, message: `The function exists, but it never runs.\nAdd:\nadd_point()` };
  }
  return { ok: true, score: 1, message: step.runSuccess };
}

function validateClickerButtonEvent(code, step) {
  code = stripComments(code);
  if (!containsFunctionDef(code, "add_point")) {
    return { ok: false, message: `Function issue.\nDefine add_point() before connecting the button.` };
  }
  if (/button\.on_click\s*\(\s*add_point\s*\(\s*\)\s*\)/i.test(code)) {
    return { ok: false, message: `Almost.\nadd_point() runs now. add_point tells the button what to run later.\nTry:\nbutton.on_click(add_point)` };
  }
  if (!/button\.on_click\s*\(\s*add_point\s*\)/i.test(code)) {
    return { ok: false, message: `The function exists, but the button is not connected yet.\nAdd:\nbutton.on_click(add_point)` };
  }
  return { ok: true, score: 1, message: step.runSuccess };
}

function validateClickerComplete(code, step) {
  code = stripComments(code);
  const checks = [
    { test: /score\s*=\s*0/i, message: `Start the counter:\nscore = 0` },
    { test: /def\s+add_point\s*\(\s*\)\s*:/i, message: `Define the click action:\ndef add_point():` },
    { test: /score\s*=\s*score\s*\+\s*1|score\s*\+=\s*1/i, message: `Add one point inside the action:\nscore = score + 1` },
    { test: /show\s*\(\s*score\s*\)/i, message: `Show the updated score:\nshow(score)` },
    { test: /button\.on_click\s*\(\s*add_point\s*\)/i, message: `Connect the button:\nbutton.on_click(add_point)` }
  ];
  for (const check of checks) {
    if (!check.test.test(code)) return { ok: false, message: check.message };
  }
  return { ok: true, score: 1, message: step.runSuccess };
}

function getMoveAssignment(code, variableName) {
  const pattern = new RegExp(`${variableName}\\s*=\\s*["'](rock|paper|scissors)["']`, "i");
  const match = code.match(pattern);
  return match ? match[1].toLowerCase() : null;
}

function hasMovesList(code) {
  return /moves\s*=\s*\[[^\]]*["']rock["'][^\]]*["']paper["'][^\]]*["']scissors["'][^\]]*\]/i.test(code);
}

function validateRpsPlayerChoice(code, step) {
  code = stripComments(code);
  const player = getMoveAssignment(code, "player");
  if (!player) {
    return { ok: false, message: `Choice issue.\nStore one supported move:\nplayer = "rock"` };
  }
  if (!/show\s*\(\s*player\s*\)/i.test(code)) {
    return { ok: false, message: `The player choice is stored, but not shown yet.\nAdd:\nshow(player)` };
  }
  return { ok: true, player, result: player, message: `Choice stored.\nplayer is ${player}.` };
}

function validateRpsRandomChoice(code, step) {
  code = stripComments(code);
  if (!hasMovesList(code)) {
    return { ok: false, message: `List issue.\nStore all three moves:\nmoves = ["rock", "paper", "scissors"]` };
  }
  if (!/computer\s*=\s*random_choice\s*\(\s*moves\s*\)/i.test(code)) {
    return { ok: false, message: `Random choice issue.\nChoose from the moves list:\ncomputer = random_choice(moves)` };
  }
  if (!/show\s*\(\s*computer\s*\)/i.test(code)) {
    return { ok: false, message: `The computer choice is picked, but not shown yet.\nAdd:\nshow(computer)` };
  }
  const moves = ["rock", "paper", "scissors"];
  const computer = moves[Math.floor(Math.random() * moves.length)];
  return { ok: true, computer, result: computer, message: `Computer move selected: ${computer}.` };
}

function validateRpsShowBoth(code, step) {
  code = stripComments(code);
  const player = getMoveAssignment(code, "player");
  if (!player) return { ok: false, message: `Player choice is missing.\nAdd:\nplayer = "rock"` };
  const computerResult = validateRpsRandomChoice(code, step);
  if (!computerResult.ok) return computerResult;
  if (!/show\s*\(\s*player\s*\)/i.test(code)) {
    return { ok: false, message: `Show the player choice:\nshow(player)` };
  }
  return { ok: true, player, computer: computerResult.computer, result: "Choices ready", message: step.runSuccess };
}

function validateRpsTieCondition(code, step) {
  code = stripComments(code);
  if (!/if\s+player\s*==\s*computer\s*:/i.test(code)) {
    return { ok: false, message: `Condition issue.\nCheck for matching choices:\nif player == computer:` };
  }
  if (!/result\s*=\s*["']tie["']/i.test(code)) {
    return { ok: false, message: `Tie branch needs a result:\nresult = "tie"` };
  }
  if (!/show\s*\(\s*result\s*\)/i.test(code)) {
    return { ok: false, message: `The result is stored, but not shown yet.\nAdd:\nshow(result)` };
  }
  return { ok: true, player: "rock", computer: "rock", result: "tie", message: step.runSuccess };
}

function validateRpsWinCondition(code, step) {
  code = stripComments(code);
  if (!/if\s+player\s*==\s*["']rock["']\s+and\s+computer\s*==\s*["']scissors["']\s*:/i.test(code)) {
    return { ok: false, message: `Win condition issue.\nCheck rock against scissors:\nif player == "rock" and computer == "scissors":` };
  }
  if (!/result\s*=\s*["']player wins["']/i.test(code)) {
    return { ok: false, message: `The win branch needs a result:\nresult = "player wins"` };
  }
  if (!/show\s*\(\s*result\s*\)/i.test(code)) {
    return { ok: false, message: `Show the result:\nshow(result)` };
  }
  return { ok: true, player: "rock", computer: "scissors", result: "player wins", message: step.runSuccess };
}

function validateRpsComplete(code, step) {
  code = stripComments(code);
  const checks = [
    { test: /player\s*=\s*["'](rock|paper|scissors)["']/i, message: `Store the player move:\nplayer = "rock"` },
    { test: /moves\s*=\s*\[[^\]]*["']rock["'][^\]]*["']paper["'][^\]]*["']scissors["'][^\]]*\]/i, message: `Store the move list:\nmoves = ["rock", "paper", "scissors"]` },
    { test: /computer\s*=\s*random_choice\s*\(\s*moves\s*\)/i, message: `Choose the computer move:\ncomputer = random_choice(moves)` },
    { test: /if\s+player\s*==\s*computer\s*:/i, message: `Add the tie condition:\nif player == computer:` },
    { test: /if\s+player\s*==\s*["']rock["']\s+and\s+computer\s*==\s*["']scissors["']\s*:/i, message: `Add at least one win condition.` },
    { test: /show\s*\(\s*result\s*\)/i, message: `Show the final result:\nshow(result)` }
  ];
  for (const check of checks) {
    if (!check.test.test(code)) return { ok: false, message: check.message };
  }
  return { ok: true, player: "rock", computer: "scissors", result: "player wins", message: step.runSuccess };
}

const validators = {
  "color-show": validateColorShow,
  "color-assignment": validateColorAssignment,
  "color-show-variable": validateColorShowVariable,
  "color-final-assignment": validateColorFinalAssignment,
  "function-call": validateFunctionCall,
  "button-event": validateButtonEvent,
  "random-color": validateRandomColor,
  "dice-random-number": validateDiceRandomNumber,
  "dice-roll-variable": validateDiceRollVariable,
  "dice-message": validateDiceMessage,
  "dice-visual": validateDiceVisual,
  "dice-function": validateDiceFunction,
  "dice-button-event": validateDiceButtonEvent,
  "dice-repeat": validateDiceRepeat,
  "reaction-flash": validateReactionFlash,
  "reaction-start-time": validateReactionStartTime,
  "reaction-measure": validateReactionMeasure,
  "reaction-state": validateReactionState,
  "reaction-conditional": validateReactionConditional,
  "reaction-button-event": validateReactionButtonEvent,
  "reaction-complete": validateReactionComplete,
  "clicker-show-score": validateClickerShowScore,
  "clicker-store-score": validateClickerStoreScore,
  "clicker-increment": validateClickerIncrement,
  "clicker-function": validateClickerFunction,
  "clicker-button-event": validateClickerButtonEvent,
  "clicker-complete": validateClickerComplete,
  "rps-player-choice": validateRpsPlayerChoice,
  "rps-random-choice": validateRpsRandomChoice,
  "rps-show-both": validateRpsShowBoth,
  "rps-tie-condition": validateRpsTieCondition,
  "rps-win-condition": validateRpsWinCondition,
  "rps-complete": validateRpsComplete
};

function validateCurrentStep() {
  const step = currentLessonStep();
  const code = state.code[state.project] || "";
  if (!step) {
    return { ok: false, message: "Your code ran into something. No active lesson step was found." };
  }
  const validator = validators[step.validationMode];
  if (!validator) {
    return { ok: true, message: step.runSuccess || "Output confirmed." };
  }
  return validator(code, step);
}

function runColorForStep(step, result) {
  const colorName = result.colorName || "teal";
  const directShow = step.validationMode === "color-show";
  state.outputResult = {
    project: "color",
    colorName,
    trace: {
      input: directShow ? `show("${colorName}")` : `color = ${colorName}`,
      logic: directShow ? "show(...) sends a supported color value" : "show(color) reads the stored color",
      result: "screen updated",
      why: "Visible output changes when a value reaches the screen"
    }
  };
}

function runDiceForStep(step, result) {
  const roll = result.roll || rollDie();
  let logic = "show_dice(roll) maps the number to pips";
  let traceResult = `dice face updated to ${roll}`;
  if (step.validationMode === "dice-message") {
    logic = `message = "You rolled ${roll}"`;
    traceResult = "message shown";
  } else if (step.validationMode === "dice-random-number" || step.validationMode === "dice-roll-variable") {
    logic = "show(roll) sends the number to output";
    traceResult = `roll shown as ${roll}`;
  }
  state.outputResult = {
    project: "dice",
    roll,
    trace: {
      input: `roll = ${roll}`,
      logic,
      result: traceResult,
      why: "Random data can drive visible output"
    }
  };
}

function runReactionForStep(step, result) {
  const mode = result.reactionMode || "flash";
  if (mode === "flash" || mode === "ready" || mode === "state") {
    const trace = mode === "state"
      ? {
        input: "state = waiting",
        logic: "wait() pauses before state changes",
        result: "state = ready",
        why: "State tells the app what phase it is in"
      }
      : {
        input: "wait()",
        logic: "flash(\"green\") runs after the delay",
        result: "visual ready",
        why: "Timed output changes the screen after a pause"
      };
    state.outputResult = { project: "reaction", bg: "#3DD68C", label: "Ready", trace };
    return;
  }
  if (mode === "measure" || mode === "complete") {
    state.outputResult = {
      project: "reaction",
      bg: "#101827",
      label: "Wait for flash",
      trace: {
        input: "start_time = now()",
        logic: "reaction_time = now() - start_time",
        result: "reaction time measured",
        why: "Timing compares two moments"
      }
    };
    runReaction();
    return;
  }
  if (mode === "conditional") {
    state.outputResult = {
      project: "reaction",
      bg: "#101827",
      label: "State checked",
      trace: {
        input: "click event",
        logic: "if state == waiting / if state == ready",
        result: "response changes by state",
        why: "Conditions make the same input mean different things"
      }
    };
  }
}

function runClickerForStep(step, result) {
  const score = Number.isFinite(Number(result.score)) ? Number(result.score) : 1;
  const trace = step.validationMode === "clicker-store-score" || step.validationMode === "clicker-show-score"
    ? {
      input: `score = ${score}`,
      logic: "show(score) sends stored state to output",
      result: `Score: ${score}`,
      why: "Score is state the learner can see"
    }
    : {
      input: "click event",
      logic: "score + 1 updates the stored value",
      result: `Score: ${score}`,
      why: "Events can change state and refresh feedback"
    };
  state.outputResult = { project: "clicker", score, trace };
}

function runRpsForStep(step, result) {
  const player = result.player || "rock";
  const computer = result.computer || "scissors";
  const finalResult = result.result || "player wins";
  state.outputResult = {
    project: "rps",
    player,
    computer,
    result: finalResult,
    trace: {
      input: `player = ${player}; computer = ${computer}`,
      logic: "if player == computer / win condition",
      result: `result = ${finalResult}`,
      why: "Conditions decide what happens next"
    }
  };
}

let rewardTimer = null;
let lensCaptionTimer = null;
let lensCaptionMode = null;
let lensCaptionStartedAt = 0;
let reactionStartedAt = 0;
function runReaction() {
  state.outputResult = {
    project: "reaction",
    bg: "#101827",
    label: "Wait for flash",
    trace: {
      input: "start_time = now()",
      logic: "reaction_time = now() - start_time",
      result: "waiting for click",
      why: "Timing compares two moments"
    }
  };
  state.log = "Input armed.\nWait for the flash.";
  updateLog();
  const delay = state.settings.reducedMotion ? 100 : 900 + Math.floor(Math.random() * 900);
  window.setTimeout(() => {
    reactionStartedAt = performance.now();
    state.outputResult = {
      project: "reaction",
      bg: "#3DD68C",
      label: "Click",
      trace: {
        input: "flash visible",
        logic: "reaction_time = now() - start_time",
        result: "ready for click",
        why: "Timing compares two moments"
      }
    };
    const visual = document.querySelector(".reaction-output");
    if (visual) {
      visual.style.setProperty("--reaction-bg", "#3DD68C");
      const btn = visual.querySelector("button");
      if (btn) btn.textContent = "Click";
    }
  }, delay);
}

function reactionClick() {
  const ms = reactionStartedAt ? Math.round(performance.now() - reactionStartedAt) : 0;
  state.log = ms ? `Input detected.\nReaction time: ${ms} ms` : "Trace the signal.\nRun the chunk first.";
  updateLog();
}

function updateLog() {
  const log = document.querySelector("#runLog");
  if (log) log.textContent = state.log;
}

function showHint() {
  const step = currentLessonStep();
  const project = currentProject();
  state.log = step.hint || project.hint || "No hint for this step yet. Inspect the moving part.";
  updateLog();
  save();
}

function resetChunk() {
  loadStepCode();
  resetStepInteractionState();
  save();
  render();
}

function previousStep() {
  clearLensCaptionTimer();
  state.step = Math.max(0, state.step - 1);
  loadStepCode();
  resetStepInteractionState();
  save();
  render();
}

function nextStep() {
  clearLensCaptionTimer();
  const step = currentLessonStep();
  if (!state.stepStatus.success || state.stepStatus.stepId !== step.id) {
    state.log = "Run this chunk once before moving on. No pressure - just confirm the signal.";
    updateLog();
    save();
    render();
    return;
  }
  if (state.step < currentLessonSteps().length - 1) {
    state.step += 1;
    loadStepCode();
    resetStepInteractionState();
    save();
    render();
    return;
  }
  completeProject();
}

function completeProject() {
  const currentProjectId = VALID_PROJECTS.has(state.project) ? state.project : "color";
  state.project = currentProjectId;
  if (!state.completed.includes(currentProjectId)) {
    state.completed.push(currentProjectId);
  }
  state.recentlyCompletedProject = currentProjectId;
  state.reward = {
    visible: true,
    type: "project-complete",
    message: projectRewardMessage(currentProjectId),
    project: currentProjectId,
    stepId: null
  };
  if (!state.settings.reducedMotion) {
    if (rewardTimer) clearTimeout(rewardTimer);
    rewardTimer = window.setTimeout(() => { hideReward(); rewardTimer = null; }, 1500);
  }
  state.step = 0;
  resetStepInteractionState();
  setScreen("complete");
}

function complete() {
  const cd = completionData[state.project];
  const isRecent = state.recentlyCompletedProject === state.project;
  return `
    <main class="screen completion">
      <section class="panel completion-panel ${isRecent ? "completion-reward" : ""}">
        <p class="eyebrow">${escapeHtml(cd.title)}</p>
        <h2>Milestone unlocked.</h2>
        <p class="lead">${escapeHtml(cd.message)}</p>
        <p class="status">Shipped.</p>
        <p class="lead">Systems unlocked:</p>
        <ul class="win-list">
          ${cd.systemsUnlocked.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <p>${escapeHtml(cd.snakeConnection)}</p>
        <div class="cta-row">
          <button type="button" class="primary" onclick="setScreen('hub')">Try Another Ignition</button>
          <button type="button" class="secondary" onclick="setScreen('map')">View Snake Map</button>
          <button type="button" class="secondary" onclick="setScreen('${isIgnitionComplete() && !state.completed.includes("clicker") && !state.completed.includes("rps") ? "ignitionComplete" : "dashboard"}')">Continue</button>
        </div>
      </section>
      <section class="panel">
        <h3>Recent Wins</h3>
        <div class="stats-row">
          <span class="pill">${IGNITION_PROJECT_IDS.filter(id => state.completed.includes(id)).length} / 3 Ignition projects</span>
          <span class="pill">${progressPercent()}% free path</span>
          <span class="pill">No shame states</span>
        </div>
      </section>
    </main>
  `;
}

function ignitionComplete() {
  return `
    <main class="screen completion">
      <section class="panel">
        <p class="eyebrow">Ignition Complete</p>
        <h2>You proved the method works.</h2>
        <p class="lead">You learned variables, events, screen updates, visual feedback, and state changes. Now build the systems that lead to Snake.</p>
        <ul class="win-list">
          <li>variables</li>
          <li>events</li>
          <li>screen updates</li>
          <li>visual feedback</li>
          <li>state changes</li>
        </ul>
        <div class="cta-row">
          <button class="primary" onclick="setScreen('paywall')">Unlock Full Path</button>
          <button class="secondary" onclick="setScreen('hub')">Review Ignition</button>
          <button class="secondary" onclick="setScreen('map')">View Snake Map</button>
        </div>
      </section>
      <section class="snake-stage">
        <p class="sr-only">
          Animated Snake preview showing the final project destination.
          The Snake path is made of input, random apple placement, screen updates, and game loop systems.
        </p>
        <canvas id="snakeCanvas" class="snake-canvas" width="640" height="360"></canvas>
        <div class="system-strip">
          ${systemChip("Input", "Reaction Timer", true)}
          ${systemChip("Random apple", "Dice Roller", true)}
          ${systemChip("Screen updates", "Color Flasher", true)}
          ${systemChip("Game loop", "Unlock path", false)}
        </div>
      </section>
    </main>
  `;
}

function level1Intro() {
  return `
    <main class="screen">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Level 1</p>
          <h2>Feedback Loops + Decisions</h2>
          <p class="lead">Two focused builds extend Ignition into the systems Snake needs next.</p>
        </div>
        <button type="button" class="secondary" onclick="setScreen('dashboard')">Back to Dashboard</button>
      </div>
      <section class="grid">
        ${level1Projects().map(([id, project]) => card(`
          <div class="visual-tile">${projectVisual(id)}</div>
          <div>
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.brief)}</p>
          </div>
          ${conceptChips(project.concepts)}
          ${button({
            label: `Start ${project.title}`,
            className: state.completed.includes(id) ? "secondary" : "primary",
            onClick: `setProject('${escapeJsString(id)}')`
          })}
        `, "card project-card")).join("")}
      </section>
      <section class="panel">
        <h3>Snake bridge</h3>
        <p>Click Counter teaches score and state updates. Rock Paper Scissors teaches decisions and conditions. Both become Snake systems later.</p>
      </section>
    </main>
  `;
}

function paywall() {
  const level1Unlocked = isLevelUnlocked("level1");
  return `
    <main class="screen paywall">
      <section class="panel">
        <p class="eyebrow">Full Path</p>
        <h2>${level1Unlocked ? "Level 1 is available." : "Preview the next Snake systems."}</h2>
        <p class="lead">${level1Unlocked ? "Feedback loops and decision logic are ready to open." : "This prototype simulates the unlock for Level 1 only. No payment is connected."}</p>
        <div class="cta-row">
          ${level1Unlocked
            ? `<button type="button" class="primary" onclick="setScreen('level1Intro')">Open Level 1</button>`
            : `<button type="button" class="primary" onclick="unlockLevel('level1')">Unlock Level 1 Preview</button>`}
          <button class="secondary" onclick="setScreen('hub')">Review Ignition</button>
        </div>
      </section>
      <section class="locked-list">
        ${lockedCard("Level 1", "Rock Paper Scissors, Click Counter")}
        ${lockedCard("Level 2", "Number Guessing, Quiz Game")}
        ${lockedCard("Level 3", "Flashcard App, Memory Match")}
        ${lockedCard("Level 4", "Moving Dot, Snake Lite, Full Snake")}
        ${lockedCard("Side Quests", "Text Adventure, Password Meter, Stopwatch, Weather App")}
      </section>
    </main>
  `;
}

function lockedCard(title, body) {
  return `<article class="card map-card locked"><p class="lock">Locked</p><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`;
}

function map() {
  const systems = [
    ["Input", "learned in Reaction Timer", "reaction", null],
    ["Random apple", "learned in Dice Roller", "dice", null],
    ["Screen updates", "learned in Color Flasher", "color", null],
    ["Score", "learned in Click Counter", "clicker", "level1"],
    ["Decisions", "learned in Rock Paper Scissors", "rps", "level1"],
    ["Memory", "learned in Flashcards", null, "level2"],
    ["Game loop", "learned in Moving Dot", null, "level2"],
    ["Restart", "learned in Snake Lite", null, "level2"]
  ];
  return `
    <main class="screen">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Snake Systems Map</p>
          <h2>Every small build becomes a Snake system.</h2>
        </div>
        <button class="primary" onclick="setScreen('hub')">Continue Ignition</button>
      </div>
      <section class="map-grid">
        ${systems.map(([name, source, id, levelId]) => {
          const available = !levelId || isLevelUnlocked(levelId);
          const unlocked = !!(id && state.completed.includes(id));
          const recent = isRecentlyUnlockedNode(id);
          return `
            <article class="card map-card ${unlocked ? "unlocked" : available ? "" : "locked"}${recent ? " node-recent" : ""}">
              <p class="${unlocked || available ? "status" : "lock"}">${unlocked ? "Signal locked" : available ? "Available" : "Locked"}</p>
              <h3>${escapeHtml(name)}</h3>
              <p>${escapeHtml(source)}</p>
              <button type="button" class="secondary" onclick="${id && available ? `setProject('${escapeJsString(id)}')` : `setScreen('paywall')`}">
                ${unlocked ? "Review" : available && id ? "Start Project" : "Unlock Context"}
              </button>
            </article>
          `;
        }).join("")}
      </section>
    </main>
  `;
}

function dashboard() {
  const remainingIgnition = IGNITION_PROJECT_IDS.filter(id => !state.completed.includes(id));
  const remainingLevel1 = LEVEL1_PROJECT_IDS.filter(id => !state.completed.includes(id));
  const ignitionComplete = !remainingIgnition.length;
  const level1Unlocked = isLevelUnlocked("level1");
  const headline = !ignitionComplete
    ? "Finish the free Ignition layer."
    : !level1Unlocked
    ? "Level 1 is ready to preview."
    : remainingLevel1.length
    ? "Continue Level 1."
    : "Level 1 complete.";
  const summary = !ignitionComplete
    ? "Resume without friction. The next recommended step is waiting."
    : !level1Unlocked
    ? "Feedback loops and decisions are the next Snake systems."
    : remainingLevel1.length
    ? "Score and decision logic are open now."
    : "The next level remains locked in this prototype.";
  const nextTitle = !ignitionComplete
    ? projects[remainingIgnition[0]].title
    : !level1Unlocked
    ? "Level 1: Feedback Loops + Decisions"
    : remainingLevel1.length
    ? projects[remainingLevel1[0]].title
    : "Next level locked";
  const nextAction = !ignitionComplete
    ? `setProject('${escapeJsString(remainingIgnition[0])}')`
    : !level1Unlocked
    ? `setScreen('paywall')`
    : remainingLevel1.length
    ? `setProject('${escapeJsString(remainingLevel1[0])}')`
    : `setScreen('paywall')`;
  const nextButton = !ignitionComplete
    ? "Open"
    : !level1Unlocked
    ? "Preview Unlock"
    : remainingLevel1.length
    ? "Open"
    : "Preview Next";
  return `
    <main class="screen">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Current Mission</p>
          <h2>${escapeHtml(headline)}</h2>
          <p class="lead">${escapeHtml(summary)}</p>
        </div>
        <button type="button" class="primary" onclick="${nextAction}">${escapeHtml(nextButton)}</button>
      </div>
      <section class="grid">
        <article class="card">
          <h3>Next Recommended Step</h3>
          <p>${escapeHtml(nextTitle)}</p>
          <button type="button" class="secondary" onclick="${nextAction}">${escapeHtml(nextButton)}</button>
        </article>
        <article class="card">
          <h3>Level 1: Feedback Loops + Decisions</h3>
          <p class="${level1Unlocked ? "status" : "lock"}">${level1Unlocked ? remainingLevel1.length ? "Available" : "Signal locked" : "Locked"}</p>
          <p>Click Counter and Rock Paper Scissors connect score, events, choices, and conditions.</p>
          <button type="button" class="secondary" onclick="${level1Unlocked ? `setScreen('level1Intro')` : `setScreen('paywall')`}">${level1Unlocked ? "Open Level 1" : "Preview Unlock"}</button>
        </article>
        <article class="card">
          <h3>Snake Progress</h3>
          <p>${progressPercent()}% of free systems locked.</p>
          <button type="button" class="secondary" onclick="setScreen('map')">View Map</button>
        </article>
        <article class="card">
          <h3>Focus Tools</h3>
          <p>Font size, motion, contrast, and Focus Mode are available now.</p>
          <button type="button" class="secondary" onclick="setScreen('settings')">Open Settings</button>
        </article>
      </section>
    </main>
  `;
}

function settings() {
  return `
    <main class="screen">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Focus Controls</p>
          <h2>Tune the workspace.</h2>
        </div>
      </div>
      <section class="settings-grid">
        <article class="card setting-row">
          <div><h3>Font Size</h3><p>Large text without changing the layout.</p></div>
          <input type="range" min="0.9" max="1.25" step="0.05" value="${state.settings.font}" oninput="state.settings.font=this.value; save(); applySettings();" />
        </article>
        <article class="card setting-row">
          <div><h3>Motion</h3><p>Reduce animation timing.</p></div>
          <button class="secondary ${state.settings.reducedMotion ? "active" : ""}" onclick="toggleSetting('reducedMotion')">${state.settings.reducedMotion ? "Reduced" : "Standard"}</button>
        </article>
        <article class="card setting-row">
          <div><h3>Contrast</h3><p>Sharper boundaries and brighter text.</p></div>
          <button class="secondary ${state.settings.highContrast ? "active" : ""}" onclick="toggleSetting('highContrast')">${state.settings.highContrast ? "High" : "Standard"}</button>
        </article>
        <article class="card setting-row">
          <div><h3>Theme Intensity</h3><p>Low Neon, Medium Neon, or Full Glitch.</p></div>
          <select onchange="state.settings.theme=this.value; save();">
            ${["Low Neon", "Medium Neon", "Full Glitch"].map(v => `<option ${state.settings.theme === v ? "selected" : ""}>${v}</option>`).join("")}
          </select>
        </article>
      </section>
    </main>
  `;
}

function toggleFocus() {
  state.focus = !state.focus;
  save();
  render();
}

function toggleLineNumbers() {
  state.lineNumbers = !state.lineNumbers;
  save();
  render();
}

function toggleSetting(key) {
  state.settings[key] = !state.settings[key];
  save();
  render();
}

function drawSnake(canvas) {
  const ctx = canvas.getContext("2d");
  const grid = 24;
  const snake = [[7, 7], [6, 7], [5, 7], [4, 7]];
  const apple = [17, 8];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#080c12";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  for (let x = 0; x < canvas.width; x += grid) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += grid) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
  ctx.fillStyle = "#FF6B35";
  ctx.fillRect(apple[0] * grid, apple[1] * grid, grid, grid);
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? "#00C8A0" : "#3DD68C";
    ctx.fillRect(part[0] * grid, part[1] * grid, grid - 2, grid - 2);
  });
  ctx.fillStyle = "#f4f7fb";
  ctx.font = "700 20px ui-monospace, monospace";
  ctx.fillText("SNAKE PATH", 28, 42);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showReward({ type = "system-message", message = "", project = null, stepId = null }) {
  state.reward = { visible: true, type, message, project, stepId };
  save();
  render();
  if (!state.settings.reducedMotion) {
    if (rewardTimer) clearTimeout(rewardTimer);
    rewardTimer = window.setTimeout(() => { hideReward(); rewardTimer = null; }, 1500);
  }
}

function hideReward() {
  state.reward = {
    visible: false,
    type: "",
    message: "",
    project: null,
    stepId: null
  };
  save();
  render();
}

function projectRewardMessage(projectId) {
  const messages = {
    color: "That's a working Color Flasher. Yours now.",
    dice: "That's a working Dice Roller. Yours now.",
    reaction: "That's a working Reaction Timer. Yours now.",
    clicker: "That's a working Click Counter. Yours now.",
    rps: "That's working decision logic. Yours now."
  };
  return messages[projectId] || "Shipped.";
}

function didCurrentStepJustSucceed() {
  const step = currentLessonStep();
  return !!step &&
    state.stepStatus.success &&
    state.lastSuccessfulRun.project === state.project &&
    state.lastSuccessfulRun.stepId === step.id;
}

function isFirstStepSuccess(step) {
  return !state.stepResults[state.project]?.[step.id];
}

function markStepSuccess(step) {
  if (!state.stepResults[state.project]) {
    state.stepResults[state.project] = {};
  }
  state.stepResults[state.project][step.id] = true;
}

function isRecentlyUnlockedNode(id) {
  return !!id && state.recentlyCompletedProject === id;
}

window.setScreen = setScreen;
window.setProject = setProject;
window.toggleFocus = toggleFocus;
window.toggleLineNumbers = toggleLineNumbers;
window.toggleSetting = toggleSetting;
window.updateCode = updateCode;
window.resetChunk = resetChunk;
window.showHint = showHint;
window.previousStep = previousStep;
window.nextStep = nextStep;
window.runChunk = runChunk;
window.reactionClick = reactionClick;
window.setPredictionAnswer = setPredictionAnswer;
window.setPredictionText = setPredictionText;
window.skipOptionalStep = skipOptionalStep;
window.hideReward = hideReward;
window.unlockLevel = unlockLevel;
window.initSnakeLens = initSnakeLens;

initGlitch();

if (!state.code[state.project]) loadStepCode();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && glitchState === "thinking") {
    setGlitchState("dormant");
  }
  if (event.key === "Escape" && state.focus) {
    state.focus = false;
    save();
    render();
  }
});

render();
requestAnimationFrame(updateGlitch);
