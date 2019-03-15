import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

import defaultComponents from './components';
import useOnClickOutside from './useOnClickOutside';

/*
    Phases:
    1. Initial render: Unconditionally render all tabs. When used with server-side
       rendering, this produces complete static HTML that is still usable in the event
       that JavaScript fails to load on the client.
    2. componentDidMount: Trigger a "measuring" render.
    3. Measuring render: Unconditionally render all tabs, as well as the menu button.
    4. Measure DOM elements: After the measuring render, determine which tabs can fit
       without overflowing and save these as `visibleTabIndices`.
    5. Final render: Render visible tabs and shift the rest into the overflow menu.

    ** When the window is resized or the tabs themselves change, trigger steps 3 on.
*/

export default function DynamicTabs({
    classNamePrefix = 'dynamic-tabs',
    children,
    components = {},
    ...props
}) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [visibleTabIndices, setVisibleTabIndices] = useState([]);
    const [measuringRender, setMeasuringRender] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // 2. componentDidMount
    useEffect(() => {
        setIsMounted(true);
        setMeasuringRender(true);
    }, []);

    // 3. Measure DOM elements
    const tabContainerRef = useRef(null);
    const menuButtonRef = useRef(null);
    useLayoutEffect(() => {
        if (measuringRender) {
            // Get the child tab elements
            const tabElements = Array.from(tabContainerRef.current.children);

            // HTMLElement.offsetLeft measures from the nearest positioned parent
            // element, so force the tab container to be positioned.
            tabContainerRef.current.style.position = 'relative';

            const visible = [];
            tabElements.forEach((tab, index) => {
                let stopWidth = tab.offsetLeft + tab.offsetWidth;

                // Don't count the width of the More button unless it will be visible
                if (visible.length === tabElements.length - 1)
                    stopWidth -= menuButtonRef.current.offsetWidth;

                if (tabContainerRef.current.offsetWidth >= stopWidth)
                    visible.push(index);
            });
            setVisibleTabIndices(visible);
            setMeasuringRender(false);
        }
    }, [measuringRender]);

    // Close the menu on outside clicks
    const menuContainerRef = useRef(null);
    useOnClickOutside(menuContainerRef, () => {
        setMenuIsOpen(false);
    });

    // Close the menu when Escape is pressed
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                setMenuIsOpen(false);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return function cleanUp() {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // ** Trigger a measuringRender when the window is resized
    useEffect(() => {
        function handleResize() {
            setMeasuringRender(true);
            // setMenuIsOpen(false);
        }
        window.addEventListener('resize', handleResize);
        return function cleanUp() {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ** Trigger a measuringRender when the tabs (children) prop changes
    useEffect(() => {
        setMeasuringRender(true);
    }, [children]);

    // Add props to each tab
    const allTabs = React.Children.map(children, (tab, index) => {
        return React.cloneElement(tab, {
            key: index,
        });
    });

    // Collect the visible and overflow tabs for rendering
    let currentIsInMenu = false;
    let visibleTabs = [];
    const overflowTabs = [];
    if (!isMounted || measuringRender) {
        visibleTabs = allTabs;
    } else {
        allTabs.forEach((tab, index) => {
            if (visibleTabIndices.includes(index)) {
                visibleTabs.push(tab);
            } else {
                if (tab.props.isActive) {
                    currentIsInMenu = true;
                }
                overflowTabs.push(tab);
            }
        });
    }

    // Merge custom components with default components
    const {Container, TabContainer, MenuContainer, MenuButton, Menu} = {
        ...defaultComponents,
        ...components,
    };

    const commonProps = {classNamePrefix, menuIsOpen, currentIsInMenu};

    return (
        <Container {...commonProps} innerProps={{...props}}>
            {visibleTabs.length > 0 && (
                <TabContainer {...commonProps} innerRef={tabContainerRef}>
                    {visibleTabs}
                </TabContainer>
            )}

            {(measuringRender || overflowTabs.length > 0) && (
                <MenuContainer {...commonProps} innerRef={menuContainerRef}>
                    <MenuButton
                        {...commonProps}
                        innerRef={menuButtonRef}
                        innerProps={{
                            onClick: () => setMenuIsOpen(!menuIsOpen),
                            'aria-haspopup': true,
                            'aria-expanded': menuIsOpen,
                        }}
                    />
                    {menuIsOpen && <Menu {...commonProps}>{overflowTabs}</Menu>}
                </MenuContainer>
            )}
        </Container>
    );
}
