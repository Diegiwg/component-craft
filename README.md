# ComponentCraft

ComponentCraft é uma demonstração que visa construir uma biblioteca de Web Components de forma simples e eficaz.

## Visão Geral

Cada componente é representado por um arquivo HTML localizado na pasta 'components'. Cada arquivo de componente possui três seções distintas: 'template', 'style' e 'script', permitindo uma clara separação de estrutura, estilo e lógica de interatividade.

- **Template:** Esta seção é onde você estrutura o código HTML do componente, podendo usar tags HTML normais ou até mesmo outros componentes. A estruturação ocorre dentro da tag `<template>`, permitindo uma organização clara.

- **Script:** Aqui é onde você desenvolve a lógica de interatividade do componente. Devido ao componente ser um documento isolado, é disponibilizado via variável 'root' o nó base do componente. Isso permite que você selecione qualquer tag dentro do componente usando, por exemplo, `root.querySelector('input')` ou `root.querySelector('#id')`.

- **Style:** A seção de estilo é onde você coloca o CSS do componente. Para manter a estilização isolada, é disponibilizada uma classe '.root' que se aplica ao nó base do componente. Isso permite que você estilize elementos dentro do componente sem interferir em outras tags da aplicação.

## Passando PROPS para Componentes

É possível passar propriedades (PROPS) para dentro do componente usando a seguinte notação:

```html
<template>
    <h1>"[title]"</h1>

    <p id="element-by-js"></p>
    <slot></slot>
</template>
    
<script>
    const p_node = root.querySelector('#element-by-js')
    p_node.innerText = "[content]"
</script>

<style>
    .root {
        color: "[color]";
    }
</style>
```

Dessa forma, quando a TAG do componente for adicionada ao App, você pode passar os valores das propriedades da seguinte maneira:

```html
<cc-element title="Meu Título" color="red" content="Meu Conteúdo">
    <p>Isso vai dentro da TAG 'Slot'</p>
</cc-element>
```

## Registro Automático de Componentes

Todos os componentes são registrados automaticamente e estarão disponíveis para uso em qualquer página da aplicação, seguindo o padrão `cc-{nome do elemento}`.

## Como Usar

1. Clone este repositório em sua máquina local.
2. Explore a pasta 'components' para ver exemplos de componentes.
3. Personalize e crie seus próprios componentes seguindo a estrutura mencionada.
4. Adicione os componentes personalizados em suas páginas da aplicação usando a notação `<cc-{nome do elemento}>`.
5. Aproveite a facilidade de criação de componentes e a reutilização em todo o seu projeto.

## Exemplos

Veja exemplos de componentes na pasta 'components' deste repositório para entender como criar seus próprios componentes personalizados.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções para este projeto. Basta fazer um fork deste repositório, fazer suas alterações e enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

**Nota:** Este é um projeto de demonstração e pode ser adaptado e expandido para atender às necessidades específicas do seu projeto. Aproveite a criação de componentes reutilizáveis e a organização clara do código.
