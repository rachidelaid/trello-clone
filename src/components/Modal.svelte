<script>
  export let position = { top: 0, right: 0 };
</script>

<div class="modal" id="modal" on:click>
  <div
    class="menu"
    style={`--top: ${position.top}px; --right: ${position.right}px`}
  >
    <div class="option">Open</div>
    <div class="option">Edit lable</div>
    <div class="option">Copy</div>
    <div class="option" id="delete">Delete</div>
  </div>
</div>

<style>
  .modal {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 999;
    position: fixed;
  }

  .menu {
    margin-left: 5px;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 5px;
    top: var(--top);
    left: var(--right);
  }

  .option {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
    transition: all 0.2s ease-in-out;
  }

  .option:hover {
    transform: translateX(7px);
  }
</style>
