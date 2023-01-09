//@ts-nocheck
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const render = (document) =>
	documentToReactComponents(document, {
		renderNode: {
			[BLOCKS.LIST_ITEM]: (node, children) => {
				const transformedChildren = documentToReactComponents(node, {
					renderMark: {
						[MARKS.BOLD]: (text) => <strong>{text}</strong>,
					},
					renderNode: {
						[BLOCKS.PARAGRAPH]: (node, children) => children,
						[BLOCKS.LIST_ITEM]: (node, children) => children,
					},
				});

				return <li>{transformedChildren}</li>;
			},
			[INLINES.HYPERLINK]: (node) => {
				return (
					<a href={node.data.uri} rel="noreferrer" target="_blank">
						{node.content[0].value}
					</a>
				);
			},
		},
	});

export default render;
