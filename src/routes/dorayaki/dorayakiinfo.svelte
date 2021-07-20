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
    import { Divider } from "svelte-materialify";
    import {
        getDorayakiById,
        updateDorayaki,
        deleteDorayaki,
    } from "./../../js/dorayakiapi.js";
    import {
        getTokoJumlahDorayakiById,
        tokoDorayakiBaru,
    } from "./../../js/tokoapi.js";

    let theme = "g10";

    let loginval = getloggedinfo();
    let loadingbar = true;
    let adddisabled = false;
    let disabled = false;

    let rasa = "Hambar",
        id = "",
        deskripsi = "Dorayaki rasa hambar hoek",
        gambar = "",
        lastupdate = "";

    let inputrasa, inputdeskripsi, inputgambar;

    const addToStore = async () => {
        adddisabled = true;
        let data = await tokoDorayakiBaru(loginval.id, params.id);
        disabled = false;
        have = 1;
    };

    const deletedorayaki = async () => {
        disabled = true;
        await deleteDorayaki(params.id);

        disabled = false;
        location.href = "#/dorayaki";
    };

    const updatedorayaki = async () => {
        if (!inputrasa) {
            inputrasa = rasa;
        }
        if (!inputdeskripsi) {
            inputdeskripsi = deskripsi;
        }
        if (!inputgambar) {
            inputgambar = gambar;
        }

        disabled = true;

        await updateDorayaki(params.id, {
            rasa: inputrasa,
            gambar: inputgambar,
            deskripsi: inputdeskripsi,
        });

        disabled = false;

        rasa = inputrasa;
        deskripsi = inputdeskripsi;
        gambar = inputgambar;
    };

    const loaddorayaki = async () => {
        loadingbar = true;
        let data = await getDorayakiById(params.id);
        if (data.length === 0) {
            loadingbar = false;
            location.href += "/notfound";
            return;
        }

        let req = await getTokoJumlahDorayakiById(loginval.id, params.id);
        if (req) {
            have = req.jumlah;
        } else {
            have = 0;
        }

        loadingbar = false;
        rasa = data[0].rasa;
        id = data[0].id;
        deskripsi = data[0].deskripsi;
        lastupdate = data[0].updatedAt;
        gambar = data[0].gambar;

        inputrasa = rasa;
        inputdeskripsi = deskripsi;
        inputgambar = gambar;
    };

    onMount(async () => {
        loginval = await verifylogindata();
        //await loaddorayaki();
    });

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();

    $: have = 0;
    $: loaddorayaki(params.id);
</script>

<svelte:head>
    <title>SWD - Dorayaki</title>
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
                        <BreadcrumbItem href="#/dorayaki"
                            >Dorayaki</BreadcrumbItem
                        >
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
                            alt="Gambar dorayaki"
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
                                    <h4>Dorayaki - Rasa {rasa}</h4>
                                    <p>
                                        {deskripsi}
                                    </p>
                                    <br />
                                    {#if have === 0}
                                        <Button
                                            disabled={adddisabled}
                                            type="submit"
                                            on:click={addToStore}
                                            style="color: white;"
                                            icon={Add20}
                                        >
                                            Add to Your Store
                                        </Button>
                                    {:else}
                                        <p>You have {have} this Dorayaki.</p>
                                    {/if}
                                </div>
                            </TabContent>
                            <TabContent>
                                <div style="margin:10px">
                                    <h4>Update Info</h4>
                                    <div>
                                        <Form on:submit={updatedorayaki}>
                                            <MRow>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Rasa"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputrasa}
                                                        />
                                                    </FormGroup>
                                                </MCol>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Deskripsi"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputdeskripsi}
                                                        />
                                                    </FormGroup>
                                                </MCol>
                                                <MCol>
                                                    <FormGroup
                                                        legendText="Gambar (URL)"
                                                    >
                                                        <TextInput
                                                            {disabled}
                                                            bind:value={inputgambar}
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
                                                on:click={deletedorayaki}
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
    </Content>
</Theme>
