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
    import Toko from "./../components/Toko.svelte";
    import { getloggedinfo, verifylogindata, logout } from "./../js/auth.js";
    import { getToko } from "./../js/tokoapi.js";
    import randomcolor from "./../js/randomcolor.js";

    let theme = "g10";
    let loginval = getloggedinfo();
    let batch_ = [];
    let loadingbar = true;

    const loadtoko = (toko) => {
        const count = (i, n) => (i - (i % n)) / n;

        toko = toko.sort((x, y) => x.nama.toLowerCase() - y.nama.toLowerCase());
        for (let i = 0; i < count(toko.length, 4) + 1; i++) {
            batch_.push([]);
        }
        for (let i = 0; i < toko.length; i++) {
            batch_[count(i, 4)].push(toko[i]);
        }
        loadingbar = false;
        batch = [].concat(batch_);
    };

    onMount(async () => {
        loginval = await verifylogindata();
        loadtoko(await getToko());
    });

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();

    $: batch = [].concat(batch_);
</script>

<svelte:head>
    <title>Doramonangis - Store</title>
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
                        <BreadcrumbItem>Store</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h3 style="margin-bottom: 1.5rem">Doramonangis Store</h3>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4" style="margin: 25px">
            <Grid>
                {#each batch as data}
                    <Row>
                        {#each data as { id, nama, jalan, kecamatan, provinsi }}
                            <Column>
                                <Toko
                                    {id}
                                    {nama}
                                    {jalan}
                                    {kecamatan}
                                    {provinsi}
                                    color={randomcolor()}
                                />
                            </Column>
                        {/each}
                    </Row>
                {/each}
            </Grid>
        </div>
    </Content>
</Theme>
