
<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

  import Button from '../../components/atoms/Button.svelte';
</script>

<Meta title="Andromeda/Atoms/Button" component={Button} argTypes={{variant: {options: ["primary", "secondary", "error", "success", "text"], control: {type: "select"}}, name: {control: {type: "text"}}, left: {control: {type: "text"}},right: {control: {type: "text"}}}}/>

<Template let:args>
  <Button  {...args}/>
</Template>
<Story name="Default" args={{
    variant: "primary",
    name: "Default",
    full: false
  }}>
</Story>

<Story name="Primary">
  <Button variant="primary" name="Button"/>
</Story>

<Story name="Secondary">
  <Button variant="secondary" name="Button"/>
</Story>

<Story name="Error">
  <Button variant="error" name="Button"/>
</Story>

<Story name="Text">
  <Button variant="text" name="Button"/>
</Story>