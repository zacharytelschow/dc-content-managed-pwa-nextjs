import React from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Section, { SectionVariant } from './Section';

import EditorialBlock from '../components/EditorialBlock';
import HeroBannerBlock from '../components/HeroBannerBlock';
import GalleryBlock from '../components/GalleryBlock';
import CardList from '../components/CardList';
import WeatherWidget from '../components/WeatherWidget';

const styles = (theme: Theme) => ({
    layoutRow: {
        flexDirection: 'row' as 'row'
    },
    layoutColumn: {
        flexDirection: 'column' as 'column'
    }
});

export type NestedContentItem = {
    title: string;
    content: [];
    children: [];
    layout: string;
    classes: any;
};

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;

    title?: string;
    content: any[]; // can be any of numerous types; could enumerate?
    children: NestedContentItem[];
    layout: string;
}

const NestedContent: React.SFC<Props> = (props) => {
    console.log('Props:');
    console.log(props);
    const {
        classes,
        title,
        content = [],
        children = [],
        layout,
        ...other
    } = props;

    return (
        <Section variant={SectionVariant.CONTAINED} {...other}>
            <h1>Nested Content</h1>
            <div className={layout === 'Row' ? 'layout-row' : 'layout-column'}>

                {
                    content.map((item, index) => {
                        //render content
                        let ComponentType = null;

                        console.log('Found content [index ' + index + '].');
                        console.log('Never getting here.');

                        switch (item.component) {
                            case 'HeroBannerBlock':
                                ComponentType = HeroBannerBlock;
                                break;
                            case 'EditorialBlock':
                                ComponentType = EditorialBlock;
                                break;
                            case 'GalleryBlock':
                                ComponentType = GalleryBlock;
                                break;
                            case 'CardList':
                                console.log('Card List found.');
                                ComponentType = CardList;
                                break;
                            case 'WeatherWidget':
                                console.log('Weather Widget found.');
                                ComponentType = WeatherWidget;
                                break;
                        }

                        return <ComponentType {...item} />;
                    })           
                }

                {
                    children.map((child, index) => {
                        //render children
                        console.log('Found child [index ' + index + '].');
                        console.log(child);
                        return <NestedContent {...child} />;
                    })                
                }

            </div>
        </Section>
    );
};

export default withStyles(styles)(NestedContent);