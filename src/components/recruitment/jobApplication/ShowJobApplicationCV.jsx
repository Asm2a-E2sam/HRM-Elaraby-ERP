import React from "react";

const ShowJobApplicationCV = ({ cvUrl }) => {
    return (
        <div>
            <embed
                src={cvUrl}
                type="application/pdf"
                width="100%"
                height="600px"
            />
        </div>
    );
};

export default ShowJobApplicationCV;
