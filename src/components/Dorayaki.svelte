<script>
    import {
        Card,
        CardText,
        CardActions,
        Button as MButton,
        Row as MRow,
        Col as MCol,
        CardTitle,
        CardSubtitle,
    } from "svelte-materialify";

    export let rasa;
    export let gambar;
    export let deskripsi;
    export let color;
    export let id;
</script>

<Card shaped hover style="max-width:200px;margin:10px" class={color+" theme--dark"}>
    <img src={gambar} alt="background" width="200px" height="200px" />
    <CardTitle>Dorayaki</CardTitle>
    <CardSubtitle>Rasa {rasa}</CardSubtitle>
    <CardText style="height: 50px">{deskripsi}</CardText>
    <CardActions>
        <MButton text on:click={()=>location.href="/#/dorayaki/"+id}>Visit</MButton>
    </CardActions>
</Card>
