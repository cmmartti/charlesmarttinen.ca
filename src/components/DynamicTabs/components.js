import React from 'react';
import classNames from 'classnames';

export function Container({classNamePrefix, menuIsOpen, children, innerProps}) {
    return (
        <div
            style={{display: 'flex'}}
            className={classNames({
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
            style={{display: 'flex', minWidth: 0}}
            className={classNames({
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
            style={{position: 'relative'}}
            className={classNames({
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
    currentIsInMenu,
    innerProps,
    innerRef,
}) {
    return (
        <button
            className={classNames({
                [classNamePrefix + '__menu-button']: true,
                [classNamePrefix + '__menu-button--menu-is-open']: menuIsOpen,
                [classNamePrefix +
                '__menu-button--current-is-in-menu']: currentIsInMenu,
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
            style={{
                position: 'absolute',
                right: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
            className={classNames({
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
