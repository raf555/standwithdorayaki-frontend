<script>
    import {
        Content,
        Breadcrumb,
        BreadcrumbItem,
        Grid,
        Row,
        Column,
        Loading,
        Search,
        Tooltip,
    } from "carbon-components-svelte";
    import { Divider } from "svelte-materialify";
    import { onMount } from "svelte";
    import Header from "./../../components/Header.svelte";
    import Theme from "./../../components/Theme.svelte";
    import Toko from "./../../components/Toko.svelte";
    import { getloggedinfo, verifylogindata, logout } from "./../../js/auth.js";
    import { getToko } from "./../../js/tokoapi.js";
    import randomcolor from "./../../js/randomcolor.js";

    let theme = "g10";
    let loginval = getloggedinfo();
    let batch_ = [];
    let toko = [];
    let loadingbar = true;
    let searchval = "";

    const search = (searchval) => {
        let val = searchval;
        if (!val) {
            loadtoko(toko);
            return;
        }
        let condition = (d) => {
            let val = searchval;

            let kecamatanregex = /\s?-kecamatan:\"(.*?)\"\s?/;
            let provinsiregex = /\s?-provinsi:\"(.*?)\"\s?/;
            let jalanregex = /\s?-jalan:\"(.*?)\"\s?/;

            let kecamatancon = false;
            let provinsicon = false;
            let jalancon = false;
            let base = true;
            let con = true;

            if (jalanregex.test(val)) {
                let exec = jalanregex.exec(val);
                let q = exec[1];
                val = val.replace(exec[0], "");
                jalancon = new RegExp(q.toLowerCase()).test(
                    d.jalan.toLowerCase()
                );
                con = con && jalancon;
            }

            if (kecamatanregex.test(val)) {
                let exec = kecamatanregex.exec(val);
                let q = exec[1];
                val = val.replace(exec[0], "");
                kecamatancon = new RegExp(q.toLowerCase()).test(
                    d.kecamatan.toLowerCase()
                );
                con = con && kecamatancon;
            }

            if (provinsiregex.test(val)) {
                let exec = provinsiregex.exec(val);
                let q = exec[1];
                val = val.replace(exec[0], "");
                provinsicon = new RegExp(q.toLowerCase()).test(
                    d.provinsi.toLowerCase()
                );
                con = con && provinsicon;
            }

            if (!!val) {
                base = d.nama
                    .toLowerCase()
                    .match(new RegExp(val.toLowerCase()));
            }

            return base && con;

            // return base || kecamatancon || provinsicon || jalancon;
        };

        loadtoko(toko.filter((d) => condition(d)));
    };

    const loadtoko = (toko) => {
        const count = (i, n) => (i - (i % n)) / n;
        batch_ = [];
        toko = toko.sort((x, y) => x.nama.localeCompare(y.nama));
        for (let i = 0; i < count(toko.length, 4) + 1; i++) {
            batch_.push([]);
        }
        for (let i = 0; i < toko.length; i++) {
            batch_[count(i, 4)].push(toko[i]);
        }
        batch = [].concat(batch_);
    };

    onMount(async () => {
        loginval = await verifylogindata();
        toko = await getToko();
        loadtoko(toko);
        loadingbar = false;
    });

    $: (() => {
        if (!loginval) {
            logout();
            location.href = "#/login";
        }
    })();

    $: batch = [].concat(batch_);
    $: search(searchval);
</script>

<svelte:head>
    <title>SWD - Store</title>
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
                        <BreadcrumbItem>Store</BreadcrumbItem>
                    </Breadcrumb>
                </Column>
            </Row>
        </Grid>
        <br /><Divider class="grey lighten-2" />

        <div class="d-flex justify-center mt-4 mb-4">
            <Grid>
                <Row>
                    <h3 style="margin-bottom: 1.5rem">
                        Stand With Dorayaki Store List
                    </h3>
                </Row>
                <Row>
                    <Column>
                        <Search
                            bind:value={searchval}
                            placeholder="Search by name/jalan/kecamatan/provinsi.."
                        />
                    </Column>
                    <Tooltip tooltipBodyId="tooltip-body">
                        <p id="tooltip-body">
                            Untuk jalan/kecamatan/provinsi, gunakan tambahan
                            `-nama:"query"`, contoh: `-kecamatan:"kelapa gading"`
                        </p>
                    </Tooltip>
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
