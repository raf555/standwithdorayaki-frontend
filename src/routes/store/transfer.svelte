<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Form,
        FormGroup,
        Select,
        SelectItem,
        Loading,
        Button,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";
    import Header from "./../../components/Header.svelte";
    import Theme from "./../../components/Theme.svelte";
    import { getloggedinfo, verifylogindata, logout } from "./../../js/auth.js";
    import {} from "svelte-materialify";
    import { Divider } from "svelte-materialify";
    import { getDorayakiById } from "./../../js/dorayakiapi.js";
    import { getTokoDorayaki } from "./../../js/tokoapi.js";
    import Dorayaki from "./../../components/Dorayaki.svelte";

    let theme = "g10";

    let loginval = getloggedinfo();
    let inputid;
    let listdorayaki = [];
    let loadingbar = true;
    let disabled = true;
    let chosendorayaki = {};

    const getdorayaki = async () => {
        let have = await getTokoDorayaki(loginval.id);

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
            .sort((x, y) => x.rasa.localeCompare(y.rasa));
    };

    onMount(async () => {
        loginval = await verifylogindata();
        listdorayaki = await getdorayaki();
        if (listdorayaki && listdorayaki.length > 0) {
            inputid = listdorayaki[0].id;
            chosendorayaki = listdorayaki[0];
        }
        loadingbar = false;
        disabled = false;
    });

    function changedisplaydor(e) {
        let id = parseInt(e.detail);
        let out = listdorayaki.filter((d) => d.id === id)[0];
        if (out) {
            chosendorayaki = out;
        }
    }

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();
</script>

<svelte:head>
    <title>SWD - Transfer</title>
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
                        <BreadcrumbItem>Transfer</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h4 style="margin-bottom: 1.5rem">Transfer Dorayaki</h4>
                </Row>
            </Grid>
        </div>

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <Column>
                        <Form on:submit>
                            <FormGroup>
                                <Select
                                    labelText="Choose Dorayaki"
                                    placeholder="Enter Dorayaki..."
                                    bind:selected={inputid}
                                    bind:value={inputid}
                                    on:change={changedisplaydor}
                                    {disabled}
                                >
                                    {#each listdorayaki as { id, rasa, jumlah }}
                                        <SelectItem
                                            value={id}
                                            text={rasa + " - " + jumlah}
                                        />
                                    {/each}
                                </Select>
                            </FormGroup>
                        </Form>
                    </Column>
                </Row>
                <Row>
                    <Dorayaki
                        rasa={chosendorayaki.rasa}
                        deskripsi={chosendorayaki.deskripsi}
                        gambar={chosendorayaki.gambar}
                        id={chosendorayaki.id}
                        jumlah={chosendorayaki.jumlah}
                        isintrf={true}
                        isinstore={true}
                    />
                </Row>
            </Grid>
        </div>
    </Content>
</Theme>
