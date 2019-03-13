import React from 'react';
import {css} from 'emotion';
import classNames from 'classnames';

export function Container({classNamePrefix, menuIsOpen, children, innerProps}) {
    return (
        <div
            className={classNames({
                [css`display: flex`]: true,
                [classNamePrefix + '__container']: true,
                [classNamePrefix + '__container--menu-is-open']: menuIsOpen,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function TabContainer({
    classNamePrefix,
    menuIsOpen,
    innerRef,
    children,
    innerProps,
}) {
    return (
        <div
            className={classNames({
                [css`display: flex; min-width: 0`]: true,
                [classNamePrefix + '__tab-container']: true,
                [classNamePrefix + '__tab-container--menu-is-open']: menuIsOpen,
            })}
            ref={innerRef}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function MenuContainer({
    classNamePrefix,
    menuIsOpen,
    innerRef,
    children,
    innerProps,
}) {
    return (
        <div
            className={classNames({
                [css`position: relative`]: true,
                [classNamePrefix + '__menu-container']: true,
                [classNamePrefix +
                '__menu-container--menu-is-open']: menuIsOpen,
            })}
            ref={innerRef}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function MenuButton({
    classNamePrefix,
    menuIsOpen,
    innerProps,
    innerRef,
}) {
    return (
        <button
            className={classNames({
                [classNamePrefix + '__menu-button']: true,
                [classNamePrefix + '__menu-button--menu-is-open']: menuIsOpen,
            })}
            ref={innerRef}
            title="More"
            aria-label="More"
            {...innerProps}
        >
            •••
        </button>
    );
}

export function Menu({classNamePrefix, children, innerProps}) {
    return (
        <div
            className={classNames({
                [css`
                    position: absolute;
                    right: 0;
                    display: flex;
                    flex-direction: column;
                `]: true,
                [classNamePrefix + '__menu']: true,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export default {
    Container,
    TabContainer,
    MenuContainer,
    MenuButton,
    Menu,
};
