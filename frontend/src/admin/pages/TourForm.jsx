import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import FormField from "../components/FormField";
import { adminTours } from "../data/adminData";

const EMPTY = {
  title: "",
  destination: "",
  duration: "",
  price: "",
  seats: "",
  description: "",
  status: "draft",
};

export default function TourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);

  // Load existing tour when editing
  useEffect(() => {
    if (!isEdit) return;
    const tour = adminTours.find((t) => t.id === id);
    if (tour) {
      setForm({
        title: tour.title || "",
        destination: tour.destination || "",
        duration: tour.duration || "",
        price: String(tour.price || ""),
        seats: String(tour.seats || ""),
        description: tour.description || "",
        status: tour.status || "draft",
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST / PUT to API
    console.log(isEdit ? "Update tour:" : "Create tour:", form);
    navigate("/admin/tours");
  };

  return (
    <div className="max-w-2xl">
      {/* Back link */}
      <Link
        to="/admin/tours"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted
                   hover:text-accent mb-5 transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Back to packages
      </Link>

      <h3 className="text-base font-medium mb-6">
        {isEdit ? "Edit tour package" : "Add new package"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-1">
        <FormField
          label="Package name"
          id="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Bali Escape"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormField
            label="Destination"
            id="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="e.g. Indonesia"
            required
          />
          <FormField
            label="Duration"
            id="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 5 days / 4 nights"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormField
            label="Price per person"
            id="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="42000"
            required
          />
          <FormField
            label="Available seats"
            id="seats"
            type="number"
            value={form.seats}
            onChange={handleChange}
            placeholder="12"
          />
        </div>

        <FormField
          label="Description"
          id="description"
          as="textarea"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Short description of the tour..."
        />

        <FormField
          label="Status"
          id="status"
          as="select"
          value={form.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="live">Live</option>
          <option value="archived">Archived</option>
        </FormField>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4">
          <button type="submit" className="btn-primary">
            {isEdit ? "Save package" : "Create package"}
          </button>
          <Link to="/admin/tours" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}