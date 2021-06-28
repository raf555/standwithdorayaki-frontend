<script>
  import {
    SkipToContent,
    Header,
    HeaderAction,
    HeaderUtilities,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
  } from "carbon-components-svelte";
  import UserAvatar20 from "carbon-icons-svelte/lib/UserAvatar20";
  import { getContext } from "svelte";
  import { getloggedinfo, verifylogindata, logout } from "./../js/auth.js";

  const ctx = getContext("Theme");

  $: if (ctx) {
    ctx.dark.subscribe((value) => {
      console.log("dark mode?", value);
    });
    ctx.light.subscribe((value) => {
      console.log("light mode?", value);
    });
    ctx.updateVar("--cds-productive-heading-06-font-size", "4rem");
  }

  let isOpen = false;
  let loginfo = getloggedinfo();
</script>

<Header company="Doremonangis" platformName="Dashboard" href="/#/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    {#if loginfo}
      <HeaderGlobalAction aria-label="User Avatar" icon={UserAvatar20} on:click={()=>{location.href="#/toko/" + loginfo.id}}/>
    {/if}
    <HeaderAction bind:isOpen transition={false}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Dorayaki</HeaderPanelDivider>
        <HeaderPanelLink href="/#/dorayaki/">All Dorayaki</HeaderPanelLink>
        <HeaderPanelLink href="/#/dorayaki/new">Add new Dorayaki</HeaderPanelLink>
        <!--<HeaderPanelLink href="#/dorayaki/delete">Delete Dorayaki</HeaderPanelLink>-->

        <HeaderPanelDivider>Dorayaki Store</HeaderPanelDivider>
        <HeaderPanelLink href="/#/store">All Store</HeaderPanelLink>
        <HeaderPanelLink href="/#/store/dorayaki">Add/Remove Dorayaki</HeaderPanelLink>
        <HeaderPanelLink href="/#/store/transfer">Transfer Dorayaki</HeaderPanelLink>

        <HeaderPanelDivider>Other</HeaderPanelDivider>
        <HeaderPanelLink href="/#/setting">Setting</HeaderPanelLink>
        {#if loginfo}
          <HeaderPanelDivider>User</HeaderPanelDivider>
          <HeaderPanelLink href={"/#/toko/" + loginfo.id}>
            Logged in as {loginfo.nama.match(/.{1,10}/)[0] + (loginfo.nama.length>10?"..":"")}
          </HeaderPanelLink>
          <HeaderPanelLink on:click={() => logout(true)}>Logout</HeaderPanelLink>
        {:else}
          <HeaderPanelDivider>User (Logged in as Guest)</HeaderPanelDivider>
          <HeaderPanelLink href="/#/login">Login</HeaderPanelLink>
          <HeaderPanelLink href="/#/register">Register new Store</HeaderPanelLink>
        {/if}
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>
