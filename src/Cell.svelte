<script>
  export let value;
  export let id;
  export let turnFunc;
  export let winningArray;

  $: className =
    winningArray &&
    winningArray.some((v, i, a) => {
      if (v === id) {
        return true;
      }
    })
      ? "highlight"
      : "";
</script>

<style>
  section {
    display: flex;
    width: 8vw;
    height: 8vw;
    border: 1px solid;
    margin: 1vw;
  }
  p {
    margin: auto; /* Important */
    font-size: 4vw;
    text-align: center;
    text-transform: capitalize;
  }
  .highlight {
    color: coral;
  }
</style>

<section {id} class={className} on:click={turnFunc}>
  <p>{!value ? '' : value}</p>
</section>
