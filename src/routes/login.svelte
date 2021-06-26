<script>
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column,
    Button,
    TextInput,
    Form,
  } from "carbon-components-svelte";
  import { onDestroy } from "svelte";
  import Header from "./../components/Header.svelte";
  import Theme from "./../components/Theme.svelte";
  import Login16 from "carbon-icons-svelte/lib/Login16";
  import { istokoexist, key, getloggedinfo, login } from "./../js/auth.js";

  let theme = "g10";
  let loginkey = key,
    loginval = getloggedinfo(),
    inputid;
  let invalid = false,
    invalidmsg = "",
    disabled = false;

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
    if (loginval) location.href = "#/";
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
          <h1 style="margin-bottom: 1.5rem">Login</h1>
        </Column>
      </Row>
      <Row>
        <Column>
          <Form on:submit={loginform}>
            <TextInput
              {disabled}
              labelText="Userid"
              placeholder="Enter userid..."
              bind:value={inputid}
              {invalid}
              invalidText={invalidmsg}
            />
            <br />
            <Button {disabled} icon={Login16} type="submit">Login</Button>
          </Form>
        </Column>
        <Column />
      </Row>
    </Grid>
  </Content>
</Theme>
