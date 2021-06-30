<script>
    import { createEventDispatcher } from "svelte";
    import {
        Card,
        CardText,
        CardActions,
        Button as MButton,
        Row as MRow,
        Col as MCol,
        CardTitle,
        CardSubtitle,
        Divider,
    } from "svelte-materialify";
    import { Button, NumberInput } from "carbon-components-svelte";
    import { slide } from "svelte/transition";
    import GlyphCautionGlyph from "carbon-icons-svelte/lib/GlyphCautionGlyph";
    import GlyphCautionInvertedGlyph from "carbon-icons-svelte/lib/GlyphCautionInvertedGlyph";
    import { updateTokoDorayaki } from "./../js/tokoapi.js";

    export let rasa = "Hambar";
    export let gambar = "https://blog.tokowahab.com/wp-content/uploads/2019/11/Resep-Kue-Dorayaki-Isi-Cokelat.jpg";
    export let deskripsi = "Dorayaki rasa hambar hoek";
    export let color;
    export let id;
    export let lidactive = false;
    export let isinstore = false;
    export let isintrf = false;
    export let jumlah = 0;
    export let idtoko = null;
    export let authorized = false;

    const dispatch = createEventDispatcher();

    let disabled = false;

    async function updatestok() {
        if (jumlah > 999 || jumlah < 0) {
            return;
        }

        disabled = true;

        await updateTokoDorayaki(idtoko, id, jumlah);

        disabled = false;
        toggle();
        dispatch("update", {});
    }

    function toggle() {
        lidactive = !lidactive;
    }
</script>

<Card
    shaped
    hover
    style="max-width:200px;margin:10px"
    class={color + " theme--dark"}
>
    <img src={gambar} alt="background" width="200px" height="200px" />
    <CardTitle>Dorayaki</CardTitle>
    <CardSubtitle>Rasa {rasa}</CardSubtitle>
    <CardText style="height: 50px">{deskripsi}</CardText>
    <CardActions>
        {#if isinstore}
            <MButton text>
                Stock: {jumlah}
            </MButton>
            {#if authorized}
                <Button
                    text
                    size="small"
                    class="ml-auto"
                    on:click={toggle}
                    icon={!lidactive
                        ? GlyphCautionInvertedGlyph
                        : GlyphCautionGlyph}
                    kind="ghost"
                >
                    ‎
                </Button>
            {:else if isintrf}
                <Button
                    text
                    size="small"
                    class="ml-auto"
                    kind="ghost"
                    on:click={() => (location.href = "#/store/transfer/" + id)}
                    >Trf</Button
                >
            {/if}
        {:else}
            <MButton
                text
                on:click={() => (location.href = "#/dorayaki/" + id)}
            >
                Visit
            </MButton>
        {/if}
    </CardActions>
    {#if authorized && !isintrf && lidactive && isinstore}
        <div transition:slide>
            <Divider />
            <div class="pl-4 pr-4 pt-2 pb-2">
                Update Stok
                <NumberInput
                    min={0}
                    bind:value={jumlah}
                    max={999}
                    invalidText="Number must be between 0 and 999"
                    {disabled}
                />
                <br />
                <MButton
                    text
                    class="primary-color"
                    {disabled}
                    on:click={updatestok}>Update</MButton
                >
                <br />
                <br />
                <MButton
                    text
                    class="primary-color"
                    {disabled}
                    on:click={() => (location.href = "#/store/transfer/" + id)}
                    >Transfer</MButton
                >
            </div>
        </div>
    {/if}
</Card>
