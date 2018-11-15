import React from 'react';
import classNames from 'classnames';

import styles from './SiteHeader.module.scss';

export const Tab = React.forwardRef(({children, id}, ref) => (
    <div data-tab-id={id} ref={ref}>
        {children}
    </div>
));

export class CollapsingTabs extends React.Component {
    static propTypes = {
        children: (props, propName, componentName) => {
            const prop = props[propName];
            var error = null;
            React.Children.forEach(prop, child => {
                if (child.type !== Tab) {
                    error = new Error(
                        `'${componentName}' children must be of type 'Tab', not '${child.type ||
                            typeof child}'.`
                    );
                }
            });
            return error;
        },
    };
    state = {
        tabs: [],
        reset: false,
        menuOpen: false,
        isMounted: false,
    };
    containerRef = React.createRef();
    moreRef = React.createRef();
    moreBtnRef = React.createRef();
    tabRefs = [];

    componentDidMount() {
        this.setState({
            isMounted: true,
            reset: true,
        });
        window.addEventListener('resize', this.reset);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.reset);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('click', this.handleClick);
    }
    componentDidUpdate() {
        if (this.state.reset) {
            this.adapt();
        }
    }
    reset = () => {
        this.setState({
            reset: true,
            menuOpen: false,
        });
    };
    handleKeyDown = event => {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeMenu();
        }
    };
    handleClick = event => {
        if (this.moreRef.current && !this.moreRef.current.contains(event.target)) {
            this.closeMenu();
        }
    };
    adapt = () => {
        let stopWidth = 0;
        const primaryTabs = [];
        this.tabRefs.forEach(tab => {
            // Don't count the width of the More button unless it's visible
            if (primaryTabs.length === this.tabRefs.length - 1) {
                stopWidth -= this.moreBtnRef.current.offsetWidth;
            }

            const tabId = tab.getAttribute('data-tab-id');
            stopWidth += tab.offsetWidth;
            if (this.containerRef.current.offsetWidth >= stopWidth) {
                primaryTabs.push(tabId);
            }
        });
        this.setState({
            tabs: primaryTabs,
            reset: false,
        });
    };
    closeMenu = () => {
        this.setState({menuOpen: false});
    };
    toggleMenu = () => {
        this.setState(state => ({menuOpen: !state.menuOpen}));
    };

    addProps = (tab, tabId) => {
        return React.cloneElement(tab, {
            ref: node => (this.tabRefs[tabId] = node),
            key: tabId,
            id: tabId.toString(),
        });
    };
    render() {
        this.tabRefs = [];

        let tabId = -1;
        const tabs = React.Children.map(this.props.children, tab => {
            tabId += 1;
            return this.addProps(tab, tabId);
        });

        let primaryTabs = [];
        const moreTabs = [];
        if (!this.state.isMounted || this.state.reset) {
            primaryTabs = tabs;
        } else {
            tabs.forEach(tab => {
                if (this.state.tabs.includes(tab.props.id)) {
                    primaryTabs.push(tab);
                } else {
                    moreTabs.push(tab);
                }
            });
        }

        return (
            <>
                <div ref={this.containerRef} className={styles.primary}>
                    {primaryTabs.map(tab => tab)}
                </div>

                {(this.state.reset || moreTabs.length > 0) && (
                    <div ref={this.moreRef} className={styles.secondary}>
                        <button
                            className={classNames(styles.moreBtn, {
                                [styles.active]: this.state.menuOpen,
                            })}
                            ref={this.moreBtnRef}
                            title="More navigation links"
                            onClick={this.toggleMenu}
                            aria-haspopup={true}
                            aria-expanded={this.state.menuOpen}
                        >
                            • • •
                            <span hidden>More navigation links</span>
                        </button>
                        {this.state.menuOpen && (
                            <div className={styles.moreMenu}>
                                {moreTabs.map(tab => tab)}
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    }
}
