
<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

  import Avatar from '../../components/atoms/Avatar.svelte';
</script>

<Meta title="Andromeda/Atoms/Avatar" component={Avatar} argTypes={{name: {control: {type: "text"}}}}/>

<Template let:args>
  <Avatar  {...args}/>
</Template>
<Story name="Default" args={{name: "Alice"}}>
</Story>