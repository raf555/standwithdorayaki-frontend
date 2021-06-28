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

export let nama;
export let jalan;
export let kecamatan;
export let provinsi;
export let color;
export let id;
</script>


<div class="rounded pa-4" style="flex-grow:1;max-width:400px;">
    <Card shaped hover class={color + "theme--dark"}>
        <MRow>
            <MCol cols={8}>
                <CardTitle>{nama}</CardTitle>
                <CardSubtitle>{provinsi}</CardSubtitle>
                <CardText>
                    {jalan}, {kecamatan}
                </CardText>
                <CardActions>
                    <MButton text on:click={()=>location.href="/#/store/"+id}>Visit</MButton>
                </CardActions>
            </MCol>
            <MCol cols={4}>
                <img
                    src="//picsum.photos/100?random=1"
                    alt="cover"
                />
            </MCol>
        </MRow>
    </Card>
</div>
