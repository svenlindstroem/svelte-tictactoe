<script>
  export let value;
  export let id;
  export let turnFunc;
  export let winningArray;

  $: className =
    winningArray &&
    winningArray.find((v, i, a) => {
      // hack for first cell
      if (id === 0 && v === 0) {
        document.getElementById(0).classList.add("yes");
      }
      if (v === id) {
        return true;
      }
    })
      ? "yes"
      : "";
</script>

<style>
  div {
    float: left;
    width: 100px;
    height: 100px;
    border: 1px solid;
    font-size: 5rem;
    margin: 0.5rem;
  }
  .yes {
    color: coral;
  }
</style>

<div {id} class={className} on:click={turnFunc}>{!value ? '' : value}</div>
