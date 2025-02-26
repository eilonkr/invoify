"use client";

// Next
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// RHF
import { useFormContext } from "react-hook-form";

// Types
import { InvoiceType } from "@/types";
import type { Language } from "@/app/translations/invoice";

interface InvoiceTemplateProps extends InvoiceType {
    language?: Language;
}

type ViewTemplatePageProps = {
    params: { id: string };
};

const ViewTemplate = ({ params }: ViewTemplatePageProps) => {
    const templateNumber = params.id;
    const routeParams = useParams();
    const currentLocale = routeParams.locale?.toString() || 'en';

    const DynamicComponent = dynamic<InvoiceTemplateProps>(
        () =>
            import(
                `@/app/components/templates/invoice-pdf/InvoiceTemplate${templateNumber}`
            )
    );

    const { getValues } = useFormContext();
    const formValues = getValues();

    return (
        <div className="container">
            <DynamicComponent
                sender={formValues.sender}
                receiver={formValues.receiver}
                details={formValues.details}
                language={currentLocale as Language}
            />
        </div>
    );
};

export default ViewTemplate;
