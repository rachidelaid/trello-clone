<script>
  export let description;
</script>

<div class="card">{description}</div>

<style>
  .card {
    cursor: pointer;
    background-color: #000;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
    margin: 5px;
    transition: all 0.2s ease-in-out;
  }

  .card:hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.75);
  }
</style>
