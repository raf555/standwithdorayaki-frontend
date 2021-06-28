<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Loading,
    } from "carbon-components-svelte";
    import { Divider } from "svelte-materialify";
    import { onMount, onDestroy } from "svelte";
    import Header from "./../components/Header.svelte";
    import Theme from "./../components/Theme.svelte";
    import Dorayaki from "./../components/Dorayaki.svelte";
    import { getloggedinfo, verifylogindata } from "./../js/auth.js";
    import { getDorayaki } from "./../js/dorayakiapi.js";
    import randomcolor from "./../js/randomcolor.js";

    let theme = "g10";
    let loginval = getloggedinfo();
    let batch_ = [];
    let loadingbar = true;

    const loaddorayaki = (dorayaki) => {
        const count = (i, n) => (i - (i % n)) / n;
        for (let i = 0; i < count(dorayaki.length, 4) + 1; i++) {
            batch_.push([]);
        }
        for (let i = 0; i < dorayaki.length; i++) {
            batch_[count(i, 4)].push(dorayaki[i]);
        }
        loadingbar = false;
        batch = [].concat(batch_);
    };

    onMount(async () => {
        loginval = await verifylogindata();
        loaddorayaki(await getDorayaki());
    });

    $: (() => {
        if (!loginval) location.href = "#/login";
    })();

    $: batch = [].concat(batch_);
</script>

<svelte:head>
    <title>Doramonangis - Dorayaki</title>
</svelte:head>

<Loading description="loading" active={loadingbar} />
<Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 1rem">
        <Grid>
            <Row>
                <Column lg={16}>
                    <Breadcrumb noTrailingSlash aria-label="Page navigation">
                        <BreadcrumbItem href="/#/">Home</BreadcrumbItem>
                        <BreadcrumbItem>Dorayaki</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h3 style="margin-bottom: 1.5rem">Doramonangis Dorayaki</h3>
                </Row>
            </Grid>
        </div>

        {#each batch as data}
            <div class="d-flex justify-center mt-4 mb-4" style="margin: 25px">
                {#each data as { rasa, deskripsi, gambar, id }}
                    <Dorayaki
                        {rasa}
                        {deskripsi}
                        {gambar}
                        {id}
                        color={randomcolor()}
                    />
                {/each}
            </div>
        {/each}
    </Content>
</Theme>
