import fs from 'fs';
import flow from 'xml-flow';

export const read = async (pathToFile): Promise<object> => {
    return await new Promise((resolve, reject) => {
        const xmlFile = fs.createReadStream(pathToFile);
        const xmlStream = flow(xmlFile, { strict: true });

        let header = {};
        let lastGroupOID;
        const itemGroupData = {};

        xmlStream.on('tag:ItemGroupData', (xmlRecord) => {
            const itemGroupOID = xmlRecord.$attrs.ItemGroupOID;
            if (itemGroupOID !== lastGroupOID) {
                lastGroupOID = itemGroupOID;
                itemGroupData[itemGroupOID] = {
                    ItemDataOID: [],
                    ItemData: [],
                };
                xmlRecord.ItemData.forEach(itemData => {
                    itemGroupData[itemGroupOID].ItemDataOID.push(itemData.ItemOID);
                });
            }
            const record = [];
            xmlRecord.ItemData.forEach(itemData => {
                record.push(itemData.Value);
            });
            itemGroupData[itemGroupOID].ItemData.push(record);
        });

        xmlStream.on('tag:ReferenceData', (xmlRecord) => {
            header = {
                StudyOID: xmlRecord.$attrs.StudyOID,
                MetaDataVersionOID: xmlRecord.$attrs.MetaDataVersionOID,
            };
        });

        xmlStream.on('tag:ClinicalData', (xmlRecord) => {
            header = {
                StudyOID: xmlRecord.$attrs.StudyOID,
                MetaDataVersionOID: xmlRecord.$attrs.MetaDataVersionOID,
            };
        });

        xmlStream.on('end', () => {
            resolve({
                ...header,
                ItemGroupData: itemGroupData,
            });
        });
    });
};
