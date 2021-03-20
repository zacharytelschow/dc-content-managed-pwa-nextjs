import React from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Section, { SectionVariant } from './Section';
import CallToAction from './CallToAction';
import { getImageURL, ImageScaleFit, ImageScaleMode } from '../utils/getImageURL';

const styles = (theme: Theme) => ({
    root: {
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row' as 'row',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'space-between'
    },
    listItem: {
        width: '95%',

        [theme.breakpoints.down('md')]: {
            width: '45%'
        },

        [theme.breakpoints.down('sm')]: {
            width: '95%'
        }
    },
    listItemImage: {
        width: '100%',
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.025)'
        }        
    },
    listItemText: {
        marginTop: '15px'
    },
    flexContainer: {
        display: 'flex'
    },
    flexChild: {
        flex: 1,
        marginRight: '15px'
    },
    flexBiggerChild: {
        flex: 3
    }
});

export type CardItem = {
    image: string;
    header: string;
    text: string;
    callToAction: string;
    callToActionHref: string;
};

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;

    title?: string;
    items?: CardItem[];
}

const CardList: React.SFC<Props> = (props) => {
    const {
        classes,
        items = [],
        ...other
    } = props;

    return (
        <Section variant={SectionVariant.CONTAINED} {...other}>
            <ul className={classes.list}>
                {
                    items.map(item => {
                        const imageUrl = getImageURL(item.image, {
                            width: 600,
                            height: 450,
                            scaleMode: ImageScaleMode.TOP_CENTER
                        });

                        return <li className={classes.listItem}>
                            <div className={classes.flexContainer}>
                                <div className={classes.flexChild}>
                                    <img className={classes.listItemImage} src={imageUrl} />
                                </div>
                                <div className={classes.flexBiggerChild}>
                                    <Typography variant="h5">
                                        {item.header}
                                    </Typography>
                                    <p>{item.text}</p>
                                    <CallToAction href={item.callToActionHref}>
                                        {item.callToAction}
                                    </CallToAction>
                                </div>
                            </div>
                        </li>
                    })
                }
            </ul>
        </Section>
    );
};

export default withStyles(styles)(CardList);