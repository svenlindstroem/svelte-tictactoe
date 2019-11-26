<script>
  import Install from "./Install.svelte";
  import Cell from "./Cell.svelte";

  // initial values are ''
  let values = Array(9).fill("");
  const winningLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let ct = 0; // moves count
  // derive current player form ct
  $: currentPlayer = ct % 2 ? "o" : "x";
  let winner = "";
  let winningArray = undefined; // undefined or array

  function turnFunc(e) {
    const id = e.target.id;

    // already clicked, already have a winner?
    if (values[id] !== "" || winner) {
      return;
    }
    ct++;
    // set 'x' or 'o' in values
    values[id] = currentPlayer;
    getWinner();
  }

  function reset() {
    ct = 0;
    winner = "";
    winningArray = undefined;
    values = Array(9).fill("");
    // hack
    document.getElementById(0).classList.remove("yes");
  }

  function getWinner() {
    winningArray = winningLine.find(function(v, index, arr) {
      const w = [values[v[0]], values[v[1]], values[v[2]]].join("");

      if (w === "xxx") {
        winner = "Player x!";
        return true;
      }
      if (w === "ooo") {
        winner = "Player o!";
        return true;
      }
      if (ct === 9) {
        winner = "None, it's a tie!";
      }
    });
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
      border: 1px solid;
    }
  }
  .clear {
    clear: both;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<main>
  <Install />
  {#if !winner}
    <h1>It's your turn player: {currentPlayer}</h1>
  {/if}
  {#if winner}
    <h1>And the winner is: {winner}</h1>
    <p>
      <button on:click={reset}>Reset</button>
    </p>
  {/if}
  <div class="clear">
    <Cell id={0} {turnFunc} value={values[0]} {winningArray} />
    <Cell id={1} {turnFunc} value={values[1]} {winningArray} />
    <Cell id={2} {turnFunc} value={values[2]} {winningArray} />
  </div>
  <div class="clear">
    <Cell id={3} {turnFunc} value={values[3]} {winningArray} />
    <Cell id={4} {turnFunc} value={values[4]} {winningArray} />
    <Cell id={5} {turnFunc} value={values[5]} {winningArray} />
  </div>

  <div class="clear">
    <Cell id={6} {turnFunc} value={values[6]} {winningArray} />
    <Cell id={7} {turnFunc} value={values[7]} {winningArray} />
    <Cell id={8} {turnFunc} value={values[8]} {winningArray} />
  </div>
</main>
