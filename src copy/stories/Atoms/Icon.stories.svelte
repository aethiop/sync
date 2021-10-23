
<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

  import Icon from '../../components/atoms/Icon.svelte';
</script>

<Meta title="Andromeda/Atoms/Icon" component={Icon} argTypes={{name: {control:"text"}, fill: {control: "boolean"}}}/>

<Template let:args>
  <Icon  {...args}/>
</Template>

<Story name="Home" args={{
    name: "home",
    fill: false
  }}>
</Story>