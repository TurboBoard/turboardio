import { useState } from "react";

import Downshift from "downshift";

import { debounce } from "lodash";

type Item = {
    cover: string;
    id: number;
    released: number;
    title: string;
};

const _get_new_items = async (query: string, set_items: Function) => {
    const response = await fetch("/api/game_search", {
        method: "post",
        body: JSON.stringify({
            query,
        }),
    });

    const json = await response.json();

    if (json) {
        set_items(json);
    }
};

const get_new_items = debounce(_get_new_items, 500);

const Component = ({ set_game_id }: { set_game_id: Function }) => {
    const [items, set_items] = useState<Item[]>([]);

    const format_item = (item: Item) => (item ? item.title : "");

    const handle_change = (item: Item) => set_game_id(item ? item.id : null);

    const handle_input_value_change = async (input_value: string | null) => {
        if (!input_value || input_value.length < 4) {
            set_items([]);

            // TODO: I don't know if this is correct, shouldn't this be triggered by handle_change?
            set_game_id(null);

            return;
        }

        await get_new_items(input_value, set_items);
    };

    return (
        <Downshift onChange={handle_change} itemToString={format_item} onInputValueChange={handle_input_value_change}>
            {({ getInputProps, getItemProps, getLabelProps, getMenuProps, isOpen, highlightedIndex, getRootProps }) => (
                <div className="downshift">
                    <label {...getLabelProps()} className="downshift__label">
                        Search by Game Title
                    </label>

                    <div {...getRootProps({}, { suppressRefError: true })}>
                        <input {...getInputProps()} className="downshift__input" placeholder="Super Mario 64, Legend of Zelda, Mega Man X..." type="search" />
                    </div>

                    <ul {...getMenuProps()} className="downshift__list">
                        {isOpen
                            ? items.map((item, index) => {
                                  let class_name = "downshift-item";

                                  if (highlightedIndex === index) class_name += " downshift-item--highlighted";

                                  return (
                                      <li
                                          {...getItemProps({
                                              key: item.id,
                                              index,
                                              item,
                                              className: class_name,
                                          })}
                                      >
                                          <img className="downshift-item__image" alt={`${item.title} cover`} src={item.cover} />

                                          <div>
                                              <div className="downshift-item__title">{item.title}</div>
                                              <div className="downshift-item__released">{item.released}</div>
                                          </div>
                                      </li>
                                  );
                              })
                            : null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
};

export default Component;
