<script>
    export let params = {};

    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Loading,
        Form,
        FormGroup,
        TextInput,
        Button,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";
    import Add20 from "carbon-icons-svelte/lib/Add20";
    import Delete20 from "carbon-icons-svelte/lib/Delete20";
    import Restart20 from "carbon-icons-svelte/lib/Restart16";
    import Header from "./../../components/Header.svelte";
    import Theme from "./../../components/Theme.svelte";
    import { getloggedinfo, verifylogindata, logout } from "./../../js/auth.js";
    import {
        Col as MCol,
        Row as MRow,
        Tabs,
        Tab,
        TabContent,
    } from "svelte-materialify";
    import Dorayaki from "./../../components/Dorayaki.svelte";
    import randomcolor from "./../../js/randomcolor.js";
    import { Divider } from "svelte-materialify";
    import { getDorayakiById } from "./../../js/dorayakiapi.js";
    import {
        getTokoDorayaki,
        getTokoById,
        updateToko,
        deleteToko,
    } from "./../../js/tokoapi.js";

    let theme = "g10";

    let loginval = getloggedinfo();
    let loadingbar = true;
    let adddisabled = false;
    let disabled = false;

    let gambar =
        "https://lh4.googleusercontent.com/rjZMjgE3b8-JIkJ2q0YfZbRG3gGdlBrxIykPMGwXY1oa3zAE84bJOEis0GyDR7cAIhi1wtquBCdroHb5V0BoBckfLbMk7ipjk9UoiCOCO5X9j0o5rp7pTQ9aRxFhTW40fADBml6v";

    let id = "",
        nama = "",
        jalan = "",
        kecamatan = "",
        provinsi = "",
        lastupdate = "";

    let inputnama, inputjalan, inputkecamatan, inputprovinsi;

    const updatetoko = async () => {
        if (!inputnama) {
            inputnama = nama;
        }
        if (!inputjalan) {
            inputjalan = jalan;
        }
        if (!inputkecamatan) {
            inputkecamatan = kecamatan;
        }
        if (!inputprovinsi) {
            inputprovinsi = provinsi;
        }

        disabled = true;

        await updateToko(params.id, {
            nama: inputnama,
            jalan: inputjalan,
            kecamatan: inputkecamatan,
            provinsi: inputprovinsi,
        });

        disabled = false;

        nama = inputnama;
        jalan = inputjalan;
        kecamatan = inputkecamatan;
        provinsi = inputprovinsi;
    };

    const deletetoko = async () => {
        disabled = true;
        await deleteToko(params.id);

        disabled = false;

        if (params.id === loginval.id) {
            logout(true);
        } else {
            location.href = "#/store";
        }
    };

    const loadtoko = async () => {
        loadingbar = true;
        let data = await getTokoById(params.id);

        if (data.length === 0) {
            loadingbar = false;
            location.href = "#/notfound";
            return;
        }

        await loaddorayaki();

        loadingbar = false;

        id = data[0].id;
        nama = data[0].nama;
        jalan = data[0].jalan;
        kecamatan = data[0].kecamatan;
        provinsi = data[0].provinsi;
        lastupdate = data[0].updatedAt;

        inputnama = nama;
        inputjalan = jalan;
        inputkecamatan = kecamatan;
        inputprovinsi = provinsi;
    };

    let batch_ = [];

    const getdorayaki = async () => {
        let have = await getTokoDorayaki(params.id);

        let out = [];
        let promises = [];

        for (let i = 0; i < have.length; i++) {
            promises.push(getDorayakiById(have[i].iddorayaki));
        }

        let promised = await Promise.all(promises);

        promised.forEach((data) => {
            let cur = data[0];
            let jumlah = have.filter((d) => d.iddorayaki === cur.id)[0].jumlah;
            out.push(
                Object.assign(cur, {
                    jumlah: jumlah,
                })
            );
        });

        return out
            .filter((d) => d.jumlah > 0)
            .sort((x, y) => -1 * (x.jumlah - y.jumlah));
    };

    const loaddorayaki = async () => {
        loadingbar = true;
        let dorayaki = await getdorayaki();
        const count = (i, n) => (i - (i % n)) / n;
        batch_ = [];
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
        //await loadtoko();
    });

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();

    $: loadtoko(params.id);
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
                        <BreadcrumbItem href="#/">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#/store">Store</BreadcrumbItem>
                        <BreadcrumbItem>{params.id}</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4 elevation-2">
            <MRow class="align-start" noGutters>
                <MCol style="max-width: 512px; max-height: 512px;">
                    <div
                        class="pa-2 elevation-3"
                        style="height: 300px; margin: 10px;"
                    >
                        <img
                            alt="Gambar Toko"
                            style="max-width: 100%; max-height: 100%; display: block; margin: auto"
                            src={gambar}
                        />
                    </div>

                    <div
                        class="pa-2 elevation-3"
                        style="height: 40px; margin: 10px;"
                    >
                        <div style="margin: 2px">
                            Last Updated: {lastupdate}
                        </div>
                    </div>
                </MCol>
                <MCol>
                    <div
                        class="pa-2 elevation-3"
                        style="height: 350px; margin: 10px"
                    >
                        <Tabs grow>
                            <div slot="tabs">
                                <Tab>Info</Tab>
                                <Tab>Edit</Tab>
                            </div>
                            <Divider />
                            <br />
                            <TabContent>
                                <div style="margin:10px">
                                    <h4>Toko {nama}</h4>
                                    <p>
                                        {jalan}
                                        {kecamatan}
                                        {provinsi}
                                    </p>
                                </div>
                            </TabContent>
                            <TabContent>
                                <div style="margin:10px">
                                    <h4>Update Info</h4>
                                    <div>
                                        <Form on:submit={updatetoko}>
                                            <MRow>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Nama"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputnama}
                                                        />
                                                    </FormGroup>
                                                </MCol>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Jalan"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputjalan}
                                                        />
                                                    </FormGroup>
                                                </MCol>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Kecamatan"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputkecamatan}
                                                        />
                                                    </FormGroup>
                                                </MCol>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Provinsi"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputprovinsi}
                                                        />
                                                    </FormGroup>
                                                </MCol>
                                            </MRow>
                                            <Button
                                                type="submit"
                                                {disabled}
                                                style="color: white;"
                                                icon={Restart20}
                                            >
                                                Update
                                            </Button>

                                            <Button
                                                {disabled}
                                                on:click={deletetoko}
                                                kind="danger"
                                                style="color: white;"
                                                icon={Delete20}
                                            >
                                                Delete
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </TabContent>
                        </Tabs>
                    </div>
                </MCol>
            </MRow>
        </div>

        <br /><Divider class="grey lighten-2" />
        <br />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h4 style="margin-bottom: 1.5rem">Dorayaki List</h4>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4" style="margin: 25px">
            <Grid>
                {#each batch as data}
                    <Row>
                        {#each data as { rasa, deskripsi, gambar, id, jumlah }}
                            <Column>
                                <Dorayaki
                                    {rasa}
                                    {deskripsi}
                                    {gambar}
                                    {id}
                                    color={randomcolor()}
                                    isinstore={true}
                                    idtoko={params.id}
                                    {jumlah}
                                    on:update={loaddorayaki}
                                    authorized={params.id==loginval.id}
                                />
                            </Column>
                        {/each}
                    </Row><br />
                {/each}
            </Grid>
        </div>
    </Content>
</Theme>
