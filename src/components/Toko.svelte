<script>
    import {
        Card,
        CardText,
        CardActions,
        Button as MButton,
        CardTitle,
        CardSubtitle,
    } from "svelte-materialify";

    export let nama;
    export let jalan;
    export let kecamatan;
    export let provinsi;
    export let color = "";
    export let id;
    export let gambar =
        "https://lh4.googleusercontent.com/rjZMjgE3b8-JIkJ2q0YfZbRG3gGdlBrxIykPMGwXY1oa3zAE84bJOEis0GyDR7cAIhi1wtquBCdroHb5V0BoBckfLbMk7ipjk9UoiCOCO5X9j0o5rp7pTQ9aRxFhTW40fADBml6v";

    let addr = jalan + " " + kecamatan;
</script>

<Card
    shaped
    hover
    style="max-width:200px;margin:10px"
    class={color + " theme--dark"}
>
    <img src={gambar} alt="background" width="200px" height="200px" />
    <CardTitle>
        Toko {nama.match(/.{1,10}/)[0] + (nama.length > 10 ? ".." : "")}
    </CardTitle>
    <CardSubtitle>{provinsi}</CardSubtitle>
    <CardText style="height: 50px">
        {addr.match(/.{1,25}/)[0] + (addr.length > 25 ? ".." : "")}
    </CardText>
    <CardActions>
        <MButton text on:click={() => (location.href = "/#/store/" + id)}>
            Visit
        </MButton>
    </CardActions>
</Card>
