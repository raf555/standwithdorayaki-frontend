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
        NumberInput,
        Select,
        SelectItem,
        Button,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";
    import Header from "../../components/Header.svelte";
    import Theme from "../../components/Theme.svelte";
    import ArrowRight32 from "carbon-icons-svelte/lib/ArrowRight32";
    import { getloggedinfo, verifylogindata, logout } from "../../js/auth.js";
    import {
        Col as MCol,
        Row as MRow,
        Tabs,
        Tab,
        TabContent,
    } from "svelte-materialify";
    import { Divider } from "svelte-materialify";
    import { getDorayakiById } from "../../js/dorayakiapi.js";
    import {
        getTokoJumlahDorayakiById,
        getToko,
        updateTokoDorayaki,
        tokoDorayakiBaru,
    } from "../../js/tokoapi.js";
    import Dorayaki from "./../../components/Dorayaki.svelte";

    let theme = "g10";

    let loginval = getloggedinfo();
    let loadingbar = true;
    let disabled = false;
    let dorayaki = {};
    let listtoko = [];
    let inputid = 0;
    let targetsum = 0;
    let mysum = 0;
    let awalmysum = 0;
    let awaltargetsum = 0;
    let input = 0;

    const loaddorayaki = async () => {
        loadingbar = true;
        let data = await getDorayakiById(params.id);
        dorayaki = data[0];

        if (!data) {
            loadingbar = false;
            location.href = "#/notfound";
            return;
        }

        let req = await getTokoJumlahDorayakiById(loginval.id, params.id);
        if (!req || req.jumlah < 1) {
            req = { jumlah: 0 };
        }

        mysum = req.jumlah;
        awalmysum = req.jumlah;
        loadingbar = false;
    };

    onMount(async () => {
        loginval = await verifylogindata();
        listtoko = await getToko();
        listtoko = listtoko.filter((t) => t.id !== loginval.id);
        if (listtoko && listtoko.length > 0) {
            inputid = listtoko[0].id;
        }
    });

    async function updatestok(e) {
        let tot = parseInt(e.detail);
        if (tot > awalmysum) {
            mysum = awalmysum;
            targetsum = awaltargetsum;
            return;
        }
        mysum = awalmysum - tot;
        targetsum = awaltargetsum + tot;
    }

    async function transfer() {
        if (parseInt(input) > awalmysum || parseInt(input) === 0) {
            return;
        }

        disabled = true;
        if (awaltargetsum === 0) {
            await tokoDorayakiBaru(inputid, params.id);
        } else {
            await updateTokoDorayaki(inputid, params.id, targetsum);
        }

        await updateTokoDorayaki(loginval.id, params.id, mysum);
        loaddorayaki();
        disabled = false;
    }

    async function updatestoktarget(e) {
        loadingbar = true;
        let id = parseInt(e.detail);
        let req = await getTokoJumlahDorayakiById(id, params.id);
        if (!req) {
            req = { jumlah: 0 };
        }
        input = 0;
        targetsum = req.jumlah;
        awaltargetsum = req.jumlah;
        loadingbar = false;
    }

    let isinstore = true;

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();

    $: loaddorayaki(params.id);
</script>

<svelte:head>
    <title>SWD - Transfer Dorayaki</title>
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
                        <BreadcrumbItem href="#/store/transfer">
                            Transfer
                        </BreadcrumbItem>
                        <BreadcrumbItem>{params.id}</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <Column>
                        <Dorayaki {...dorayaki} {isinstore} jumlah={mysum} />
                    </Column>
                    <Column>
                        <br />
                        <br />
                        <br />
                        Yours
                        <br />
                        <ArrowRight32 />
                        <br />
                        Target
                    </Column>
                    <Column>
                        <Dorayaki
                            {...dorayaki}
                            {isinstore}
                            jumlah={targetsum}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Form on:submit={transfer}>
                            <FormGroup>
                                <Row>
                                    <Column>
                                        <Select
                                            labelText="Choose Target Store"
                                            bind:selected={inputid}
                                            bind:value={inputid}
                                            {disabled}
                                            on:change={updatestoktarget}
                                        >
                                            {#each listtoko as { id, nama }}
                                                <SelectItem
                                                    value={id}
                                                    text={nama}
                                                />
                                            {/each}
                                        </Select>
                                    </Column>
                                    <Column>
                                        <NumberInput
                                            {disabled}
                                            label="Input transfer total"
                                            min={0}
                                            max={awalmysum}
                                            on:change={updatestok}
                                            bind:value={input}
                                        />
                                    </Column>
                                </Row>
                            </FormGroup>
                            <div class="d-flex justify-center mt-4 mb-4">
                                <Button
                                    {disabled}
                                    style="color: white;"
                                    type="submit"
                                    icon={ArrowRight32}
                                >
                                    Transfer
                                </Button>
                            </div>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </div>
    </Content>
</Theme>
