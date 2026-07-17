import { visit, SKIP } from 'unist-util-visit';

function removeBackrefs(nodes) {
  return nodes
    .map((node) => {
      if (node.type === 'element' && node.properties?.dataFootnoteBackref !== undefined) {
        return null;
      }
      if (node.children) {
        return { ...node, children: removeBackrefs(node.children) };
      }
      return node;
    })
    .filter(Boolean)
    .filter((node) => !(node.type === 'text' && node.value.trim() === ''));
}

function unwrapSingleParagraph(nodes) {
  const elements = nodes.filter(
    (n) => !(n.type === 'text' && n.value.trim() === ''),
  );
  if (elements.length === 1 && elements[0].tagName === 'p') {
    return elements[0].children;
  }
  return nodes;
}

export function rehypeSidenotes() {
  return (tree) => {
    const footnotes = new Map();
    let sectionIndex = -1;
    let sectionParent = null;

    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'section' &&
        node.properties?.dataFootnotes !== undefined
      ) {
        sectionParent = parent;
        sectionIndex = index;

        visit(node, 'element', (li) => {
          if (li.tagName === 'li' && li.properties?.id) {
            const id = String(li.properties.id).replace(
              'user-content-fn-',
              '',
            );
            const content = unwrapSingleParagraph(
              removeBackrefs(li.children),
            );
            footnotes.set(id, content);
          }
        });

        return SKIP;
      }
    });

    if (footnotes.size === 0) return;

    let counter = 0;
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'sup') return;

      const link = node.children?.find(
        (c) =>
          c.type === 'element' &&
          c.tagName === 'a' &&
          c.properties?.dataFootnoteRef !== undefined,
      );
      if (!link) return;

      counter++;
      const id = String(link.properties.href).replace(
        '#user-content-fn-',
        '',
      );
      const content = footnotes.get(id);
      if (!content) return;

      const snId = `sn-${counter}`;
      parent.children[index] = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sidenote-wrapper'] },
        children: [
          {
            type: 'element',
            tagName: 'label',
            properties: {
              for: snId,
              className: ['sidenote-number'],
            },
            children: [],
          },
          {
            type: 'element',
            tagName: 'input',
            properties: {
              type: 'checkbox',
              id: snId,
              className: ['sidenote-toggle'],
            },
            children: [],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['sidenote'] },
            children: content,
          },
        ],
      };
      return SKIP;
    });

    if (sectionIndex >= 0 && sectionParent) {
      sectionParent.children.splice(sectionIndex, 1);
    }
  };
}
