<script>
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column,
    Select,
    SelectItem,
    TextInput,
    Button,
    Form,
    FormGroup,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import Header from "./../components/Header.svelte";
  import Theme from "./../components/Theme.svelte";
  import { istokoexist, key, getloggedinfo, login } from "./../js/auth.js";
  import { getToko } from "./../js/tokoapi.js";
  import Login16 from "carbon-icons-svelte/lib/Login16";

  let theme = "g10";
  let loginkey = key,
    loginval = getloggedinfo(),
    inputid;
  let invalid = false,
    invalidmsg = "",
    disabled = false;
  let listtoko = [];

  onMount(async () => {
    disabled = true;
    listtoko = await getToko();
    if (listtoko && listtoko.length>0){
      inputid = listtoko[0].id
    }
    disabled = false;
  });

  const loginform = async () => {
    disabled = true;
    invalid = false;

    if (!inputid) {
      invalid = true;
      invalidmsg = "Empty input!";
      disabled = false;
      return;
    }
    let out = await istokoexist(inputid);
    if (!out) {
      invalid = true;
      invalidmsg = "No such id exist!";
      disabled = false;
      return;
    }
    invalid = false;
    invalidmsg = "";
    login(out);
    loginval = getloggedinfo();
  };

  $: (() => {
    if (loginval) location.href = "/#/";
  })();
</script>

<svelte:head>
  <title>Doramonangis - Login</title>
</svelte:head>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column lg={16}>
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem href="#/">Home</BreadcrumbItem>
            <BreadcrumbItem>Login</BreadcrumbItem>
          </Breadcrumb>
        </Column>
      </Row>
    </Grid>

    <div class="d-flex justify-center mt-4 mb-4">
      <Grid>
        <Row>
          <h3 style="margin-bottom: 1.5rem">Doramonangis Login</h3>
        </Row>
      </Grid>
    </div>

    <div class="d-flex justify-center mt-4 mb-4">
      <Form on:submit={loginform}>
        <!--<FormGroup>
          <TextInput
            {disabled}
            labelText=""
            placeholder="Enter userid..."
            bind:value={inputid}
            {invalid}
            invalidText={invalidmsg}
          />
        </FormGroup>-->
        <FormGroup>
          <Select
            {disabled}
            labelText="Choose store"
            placeholder="Enter userid..."
            bind:selected={inputid}
            bind:value={inputid}
            {invalid}
            invalidText={invalidmsg}
            helperText="Check menu to register new Store"
          >
            {#each listtoko as { id, nama }}
              <SelectItem value={id} text={nama} />
            {/each}
          </Select>
        </FormGroup>
        <Button {disabled} icon={Login16} type="submit" kind="tertiary">Login</Button>
      </Form>
    </div>
  </Content>
</Theme>
