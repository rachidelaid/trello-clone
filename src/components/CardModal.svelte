<script>
  // your script goes here
</script>

<div class="modal" id="modal" on:click>
  <div class="container">
    <span />
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    height: 90%;
    width: 80%;
    background-color: #333;
  }
</style>
